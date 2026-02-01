import * as cdk from 'aws-cdk-lib';

// CodeStar Connection Configuration
export const CODE_STAR_CONNECTION_ARN = 'arn:aws:codestar-connections:us-east-1:123456789012:connection/abc123...';

// GitHub Repository Configuration
export const GITHUB_OWNER = 'madam-bag';
export const GITHUB_REPO = 'duemosaic-website';
export const GITHUB_BRANCH = 'main';

// Pipeline Configuration
export const PIPELINE_NAME = 'WebsitePipeline';

// Directory Configuration
export const CDK_DIRECTORY = 'cdk';
export const WEBSITE_ARTIFACTS_PATH = '../build'; // Relative to CDK directory

// Environment Configuration
export const env: cdk.Environment = {
  account: '123456789012',
  region: 'us-east-1',
};

