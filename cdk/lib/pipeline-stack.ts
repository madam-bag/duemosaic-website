import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { WebsiteStack } from './website-stack';
import {
  CODE_STAR_CONNECTION_ARN,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_BRANCH,
  PIPELINE_NAME,
  CDK_DIRECTORY,
} from './config';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get the environment from stack props
    const env = props?.env;

    // Create the pipeline
    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: PIPELINE_NAME,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection(
          `${GITHUB_OWNER}/${GITHUB_REPO}`,
          GITHUB_BRANCH,
          {
            connectionArn: CODE_STAR_CONNECTION_ARN,
          }
        ),
        installCommands: [
          // Install website dependencies at root
          'npm install',
          // Install CDK dependencies
          `cd ${CDK_DIRECTORY}`,
          'npm install',
        ],
        commands: [
          // Build the website at root
          'npm run build',
          // Build and synth CDK
          `cd ${CDK_DIRECTORY}`,
          'npm run build',
          'npx cdk synth',
        ],
        primaryOutputDirectory: `${CDK_DIRECTORY}/cdk.out`,
      }),
    });

    // Add deployment stage with environment
    pipeline.addStage(new WebsiteStage(this, 'Deploy', { env }));
  }
}

// Stage for deploying the WebsiteStack
class WebsiteStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    // Pass the environment to WebsiteStack
    new WebsiteStack(this, 'WebsiteStack', {
      env: props?.env,
    });
  }
}

