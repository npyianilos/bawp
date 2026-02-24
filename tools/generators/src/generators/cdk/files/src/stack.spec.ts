import * as cdk from 'aws-cdk-lib/core';
import { <%= className %>Stack } from './stack.js';

describe('<%= className %>Stack', () => {
  it('should instantiate', () => {
    const app = new cdk.App();
    const stack = new <%= className %>Stack(app, 'TestStack');
    expect(stack).toBeInstanceOf(cdk.Stack);
  });
});
