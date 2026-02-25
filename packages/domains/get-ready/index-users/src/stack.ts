import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

export class IndexUsersStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // OpenSearch domain – single-node t3.small for proof of concept
    const searchDomain = new opensearch.Domain(this, 'StudentSearchDomain', {
      version: opensearch.EngineVersion.OPENSEARCH_2_17,
      capacity: {
        dataNodeInstanceType: 't3.small.search',
        dataNodes: 1,
      },
      ebs: {
        volumeSize: 10, // GB
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Lambda that indexes students into OpenSearch
    const indexFn = new NodejsFunction(this, 'IndexUsersFunction', {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'src/lambda.ts',
      environment: {
        OPENSEARCH_ENDPOINT: searchDomain.domainEndpoint,
      },
    });

    // Grant the Lambda permission to write to the OpenSearch domain
    searchDomain.grantWrite(indexFn);

    // Look up the shared event bus (provisioned separately)
    const bus = events.EventBus.fromEventBusName(
      this,
      'SharedBus',
      'bawp-event-bus',
    );

    // Rule: match StudentEnrolled events and route to Lambda
    new events.Rule(this, 'StudentEnrolledRule', {
      eventBus: bus,
      eventPattern: {
        source: ['bawp.enrollment'],
        detailType: ['StudentEnrolled'],
      },
      targets: [new targets.LambdaFunction(indexFn)],
    });
  }
}
