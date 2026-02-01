#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from './pipeline-stack';
import { env } from './config';

const app = new cdk.App();
new PipelineStack(app, 'PipelineStack', {
  env: env,
});

