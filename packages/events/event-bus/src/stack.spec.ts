import * as cdk from 'aws-cdk-lib/core';
import { Template } from 'aws-cdk-lib/assertions';
import { EventBusStack } from './stack.js';

describe('EventBusStack', () => {
  it('creates the shared bawp-event-bus', () => {
    const app = new cdk.App();
    const stack = new EventBusStack(app, 'TestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Events::EventBus', {
      Name: 'bawp-event-bus',
    });
  });
});
