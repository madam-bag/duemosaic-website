import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

// CodeStar Connection Configuration
export const CODE_STAR_CONNECTION_ARN = 'arn:aws:codeconnections:us-east-1:210602314855:connection/0f42cdf1-87bd-4fe7-bb2e-d68939d4d1c9';

// GitHub Repository Configuration
export const GITHUB_OWNER = 'madam-bag';
export const GITHUB_REPO = 'duemosaic-website';
export const GITHUB_BRANCH = 'main';

// Pipeline Configuration
export const PIPELINE_NAME = 'WebsitePipeline';

// Directory Configuration
export const CDK_DIRECTORY = 'cdk';
export const WEBSITE_ARTIFACTS_PATH = path.resolve(__dirname, '..', '..', 'build');

// DNS Configuration
export const HOSTED_ZONE_NAME = 'duemosaic-architects.com';

// Environment Configuration
export const env: cdk.Environment = {
  account: '210602314855',
  region: 'us-east-1',
};

