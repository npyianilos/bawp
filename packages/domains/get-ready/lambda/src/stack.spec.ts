import * as cdk from 'aws-cdk-lib/core';
import { LambdaStack } from './stack.js';

describe('LambdaStack', () => {
  it('should instantiate', () => {
    const app = new cdk.App();
    const stack = new LambdaStack(app, 'TestStack');
    expect(stack).toBeInstanceOf(cdk.Stack);
  });
});
