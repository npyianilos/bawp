import * as cdk from 'aws-cdk-lib/core';
import { EventBusStack } from './stack.js';

const app = new cdk.App();
new EventBusStack(app, 'CdkWorkshopStack');
