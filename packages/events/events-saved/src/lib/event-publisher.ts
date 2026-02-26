export interface EventPublisher {
  publish<T>(event: {
    source: string;
    detailType: string;
    detail: T;
  }): Promise<void>;
}
