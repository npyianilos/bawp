import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';
import type { EventPublisher } from '@bawp/events';

export class EventBridgePublisher implements EventPublisher {
  private client: EventBridgeClient;
  private eventBusName: string;

  constructor(eventBusName: string) {
    this.client = new EventBridgeClient({});
    this.eventBusName = eventBusName;
  }

  async publish<T>(event: {
    source: string;
    detailType: string;
    detail: T;
  }): Promise<void> {
    const command = new PutEventsCommand({
      Entries: [
        {
          Source: event.source,
          DetailType: event.detailType,
          Detail: JSON.stringify(event.detail),
          EventBusName: this.eventBusName,
        },
      ],
    });

    const result = await this.client.send(command);

    if (result.FailedEntryCount && result.FailedEntryCount > 0) {
      throw new Error(
        `Failed to publish event: ${JSON.stringify(result.Entries?.[0])}`
      );
    }
  }
}
