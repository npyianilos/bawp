import * as cdk from 'aws-cdk-lib/core';
import { IndexUsersStack } from './stack.js';

const app = new cdk.App();
new IndexUsersStack(app, 'IndexUsersStack');
