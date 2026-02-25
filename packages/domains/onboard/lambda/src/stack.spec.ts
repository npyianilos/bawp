import * as cdk from 'aws-cdk-lib/core';
import { OnboardLambdaStack } from './stack.js';

describe('OnboardLambdaStack', () => {
  it('should instantiate', () => {
    const app = new cdk.App();
    const stack = new OnboardLambdaStack(app, 'TestStack');
    expect(stack).toBeInstanceOf(cdk.Stack);
  });
});
