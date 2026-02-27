import * as cdk from 'aws-cdk-lib/core';
import { RegistrationStack } from './stack.js';

describe('RegistrationStack', () => {
  it('should instantiate', () => {
    const app = new cdk.App();
    const stack = new RegistrationStack(app, 'TestStack');
    expect(stack).toBeInstanceOf(cdk.Stack);
  });
});
