import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

const TABLE_NAME = 'OnboardTable';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DynamoDB table for schools and students
    const table = new dynamodb.Table(this, `${TABLE_NAME}Table`, {
      tableName: TABLE_NAME,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // GSI for querying by entity type (schools)
    table.addGlobalSecondaryIndex({
      indexName: 'EntityTypeIndex',
      partitionKey: { name: 'entityType', type: dynamodb.AttributeType.STRING },
    });

    // GSI for querying students by school
    table.addGlobalSecondaryIndex({
      indexName: 'SchoolIndex',
      partitionKey: { name: 'schoolId', type: dynamodb.AttributeType.STRING },
    });

    // Lambda function hosting the tRPC router
    const fn = new NodejsFunction(this, 'Fn', {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'src/lambda.ts',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

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

    new CfnOutput(this, 'OnboardFunctionUrl', { value: fnUrl.url });
  }
}
