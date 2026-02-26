import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';
import { Stack, StackProps, CfnOutput, Fn } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Import values exported by the index-users stack
    const endpoint = Fn.importValue('StudentSearchEndpoint');
    const domainArn = Fn.importValue('StudentSearchDomainArn');

    // Look up the OpenSearch domain by attributes (fromDomainEndpoint fails with Tokens)
    const searchDomain = opensearch.Domain.fromDomainAttributes(
      this,
      'StudentSearchDomain',
      {
        domainArn,
        domainEndpoint: endpoint,
      }
    );

    const fn = new NodejsFunction(this, 'Fn', {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: 'src/lambda.ts',
      environment: {
        OPENSEARCH_ENDPOINT: endpoint,
      },
    });

    // Grant read access to OpenSearch
    searchDomain.grantRead(fn);

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
