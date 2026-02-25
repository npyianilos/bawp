import * as cdk from 'aws-cdk-lib/core';
import { LambdaStack } from './stack.js';

const app = new cdk.App();
new LambdaStack(app, 'CdkWorkshopStack');
