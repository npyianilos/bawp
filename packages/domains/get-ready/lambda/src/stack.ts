import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import {
  Stack,
  StackProps,
  CfnOutput,
  Fn,
  RemovalPolicy,
} from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

const TABLE_NAME = 'GetReadyTable';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Import values exported by the index-users stack
    const endpoint = Fn.importValue('StudentSearchEndpoint');
    const domainArn = Fn.importValue('StudentSearchDomainArn');

    const searchDomain = opensearch.Domain.fromDomainAttributes(
      this,
      'StudentSearchDomain',
      { domainArn, domainEndpoint: endpoint }
    );

    // DynamoDB table for sessions and session-students
    const table = new dynamodb.Table(this, 'GetReadyTable', {
      tableName: TABLE_NAME,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    table.addGlobalSecondaryIndex({
      indexName: 'EntityTypeIndex',
      partitionKey: {
        name: 'entityType',
        type: dynamodb.AttributeType.STRING,
      },
    });

    table.addGlobalSecondaryIndex({
      indexName: 'SchoolIndex',
      partitionKey: {
        name: 'schoolId',
        type: dynamodb.AttributeType.STRING,
      },
    });

    table.addGlobalSecondaryIndex({
      indexName: 'SessionIndex',
      partitionKey: {
        name: 'sessionId',
        type: dynamodb.AttributeType.STRING,
      },
    });

    const fn = new NodejsFunction(this, 'Fn', {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'src/lambda.ts',
      environment: {
        OPENSEARCH_ENDPOINT: endpoint,
        TABLE_NAME: table.tableName,
      },
    });

    searchDomain.grantReadWrite(fn);
    table.grantReadWriteData(fn);

    // Function URL for HTTP access
    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ['*'],
      },
    });

    new CfnOutput(this, 'GetReadyFunctionUrl', { value: fnUrl.url });
  }
}
