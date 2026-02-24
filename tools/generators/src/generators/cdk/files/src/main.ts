import * as cdk from 'aws-cdk-lib/core';
import { <%= className %>Stack } from './stack.js';

const app = new cdk.App();
new <%= className %>Stack(app, 'CdkWorkshopStack');
