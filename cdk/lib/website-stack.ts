import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { WEBSITE_ARTIFACTS_PATH, HOSTED_ZONE_NAME } from './config';

export class WebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket for website origin
    // NOTE: Do NOT set websiteIndexDocument/websiteErrorDocument here. Doing so makes
    // bucket.isWebsite === true, which causes origins.S3Origin to switch to the public
    // S3 website endpoint and silently ignore the OAI. With BlockPublicAccess.BLOCK_ALL
    // that results in 403s for every request. SPA routing is handled by CloudFront's
    // errorResponses below.
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `${this.stackName.toLowerCase()}-website-${this.account}`,
      publicReadAccess: false, // CloudFront will access via OAI
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN for production
      autoDeleteObjects: true, // Enable for cleanup
    });

    // Create CloudFront Origin Access Identity (OAI)
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: 'OAI for website bucket',
    });

    // Grant CloudFront access to the bucket
    websiteBucket.grantRead(originAccessIdentity);

    // Look up hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: HOSTED_ZONE_NAME,
    });

    // Create ACM certificate
    // Note: CloudFront requires certificates to be in us-east-1
    // If your stack is in a different region, you'll need to create the certificate separately in us-east-1
    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: HOSTED_ZONE_NAME,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    // Create CloudFront distribution with SPA configuration
    const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket, {
          originAccessIdentity: originAccessIdentity,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        compress: true,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      domainNames: [HOSTED_ZONE_NAME],
      certificate: certificate,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
      ],
    });

    this.createAssetDeployments(distribution, websiteBucket);

    // Create Route53 A record pointing to CloudFront distribution
    new route53.ARecord(this, 'WebsiteARecord', {
      zone: hostedZone,
      recordName: HOSTED_ZONE_NAME,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(distribution)
      ),
    });

    // Outputs
    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront Distribution ID',
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name',
    });

    new cdk.CfnOutput(this, 'WebsiteUrl', {
      value: `https://${HOSTED_ZONE_NAME}`,
      description: 'Website URL',
    });
  }

  private createAssetDeployments(distribution: cloudfront.Distribution, websiteBucket: s3.Bucket): s3deploy.BucketDeployment[] {
    // Get the website artifacts path (relative to CDK directory where cdk deploy is run)
    // WEBSITE_ARTIFACTS_PATH is '../build' which resolves to the build directory at repo root
    const artifactsPath = WEBSITE_ARTIFACTS_PATH;

    // 1. Deploy all static assets (JS, CSS, images) with heavy caching
    // Exclude the index.html so it doesn't get the wrong headers
    // Keeps the default `prune: true` so stale hashed assets get cleaned up on each deploy.
    const allAssetsDeployment = new s3deploy.BucketDeployment(this, 'AllAssetsDeployment', {
      sources: [
        s3deploy.Source.asset(artifactsPath, {
          exclude: ['index.html'],
          // Appending a different unique string ensures this generates a unique zip file inside cdk.out
          assetHash: cdk.FileSystem.fingerprint(artifactsPath) + '-all-assets',
        }),
      ],
      destinationBucket: websiteBucket,
      cacheControl: [
        s3deploy.CacheControl.maxAge(cdk.Duration.days(365)),
        s3deploy.CacheControl.immutable(),
      ],
      ephemeralStorageSize: cdk.Size.mebibytes(1024),
      memoryLimit: 1024,
    });

    // 2. Deploy ONLY index.html with NO CACHE and trigger CloudFront invalidation
    // We exclude everything *except* index.html using glob patterns.
    // `prune: false` is critical: this deployment's source contains only index.html,
    // so with the default prune behavior it would delete every asset uploaded by
    // AllAssetsDeployment above, leaving only index.html in the bucket.
    const entrypointDeployment = new s3deploy.BucketDeployment(this, 'EntrypointDeployment', {
      sources: [
        s3deploy.Source.asset(artifactsPath, {
          exclude: ['**/*', '!index.html'], // Exclude everything, but negate index.html
          // Appending a different unique string ensures this generates a unique zip file inside cdk.out
          assetHash: cdk.FileSystem.fingerprint(artifactsPath) + '-index-only',
        }),
      ],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/*'],
      prune: false,
      cacheControl: [
        s3deploy.CacheControl.noCache(),
        s3deploy.CacheControl.mustRevalidate(),
      ],
    });

    // Ensure assets land before index.html so AllAssetsDeployment's prune sweep
    // (which would otherwise delete any stale index.html) runs first, and the
    // CloudFront invalidation triggered by EntrypointDeployment happens once
    // every new asset is already in place.
    entrypointDeployment.node.addDependency(allAssetsDeployment);

    return [allAssetsDeployment, entrypointDeployment];
  }
}
