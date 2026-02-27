import * as cdk from 'aws-cdk-lib/core';
import { RegistrationStack } from './stack.js';

const app = new cdk.App();
new RegistrationStack(app, 'CdkWorkshopStack');
