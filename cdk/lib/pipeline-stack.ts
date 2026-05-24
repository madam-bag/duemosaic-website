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
          // 1. Install React website dependencies at the root
          'npm install',
          // 2. Install CDK dependencies using --prefix (no 'cd' required!)
          `npm install --prefix ${CDK_DIRECTORY}`,
        ],
        commands: [
          // 1. Build your React frontend website at root
          'npm run build', 
          // 2. Compile TypeScript inside the CDK folder
          `npm run build --prefix ${CDK_DIRECTORY}`,
          // 3. Synth pointing directly to the app execution string
          `npx --prefix ${CDK_DIRECTORY} cdk synth --app "node ${CDK_DIRECTORY}/bin/cdk.js"`,
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

