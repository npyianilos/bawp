import * as events from 'aws-cdk-lib/aws-events';
import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

export class EventBusStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new events.EventBus(this, 'BawpEventBus', {
      eventBusName: 'bawp-event-bus',
    });
  }
}
