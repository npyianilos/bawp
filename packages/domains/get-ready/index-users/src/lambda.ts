import { EventBridgeHandler } from 'aws-lambda';
import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { StudentEnrolledEvent } from '@bawp/events';

const client = new Client({
  ...AwsSigv4Signer({
    region: process.env.AWS_REGION ?? 'us-east-1',
    getCredentials: defaultProvider(),
  }),
  node: `https://${process.env.OPENSEARCH_ENDPOINT}`,
});

export const handler: EventBridgeHandler<
  typeof StudentEnrolledEvent.detailType,
  StudentEnrolledEvent.Payload,
  void
> = async (event) => {
  const student = event.detail;

  console.log('Indexing student', {
    id: student.id,
    schoolId: student.schoolId,
  });

  await client.index({
    index: 'students',
    id: student.id,
    body: {
      firstName: student.firstName,
      lastName: student.lastName,
      schoolId: student.schoolId,
      enrolledAt: event.time,
    },
  });

  console.log('Successfully indexed student', student.id);
};
