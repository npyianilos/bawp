import * as cdk from 'aws-cdk-lib/core';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { IndexUsersStack } from './stack.js';

describe('IndexUsersStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new IndexUsersStack(app, 'TestStack');
    template = Template.fromStack(stack);
  });

  it('creates an OpenSearch domain with t3.small.search', () => {
    template.hasResourceProperties('AWS::OpenSearchService::Domain', {
      ClusterConfig: {
        InstanceType: 't3.small.search',
        InstanceCount: 1,
      },
    });
  });

  it('creates a Lambda function with OPENSEARCH_ENDPOINT env var', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs22.x',
      Environment: {
        Variables: Match.objectLike({
          OPENSEARCH_ENDPOINT: Match.anyValue(),
        }),
      },
    });
  });

  it('creates an EventBridge rule for StudentEnrolled events', () => {
    template.hasResourceProperties('AWS::Events::Rule', {
      EventBusName: 'bawp-event-bus',
      EventPattern: {
        source: ['bawp.enrollment'],
        'detail-type': ['StudentEnrolled'],
      },
    });
  });

  it('grants the Lambda write access to the OpenSearch domain', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: Match.arrayWith(['es:ESHttpPut']),
            Effect: 'Allow',
          }),
        ]),
      },
    });
  });
});
