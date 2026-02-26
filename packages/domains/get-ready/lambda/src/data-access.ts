import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import type {
  GetReadyDataAccess,
  SearchStudent,
  SearchStudentsInput,
} from '@bawp/get-ready-router';

export class OpenSearchDataAccess implements GetReadyDataAccess {
  private client: Client;

  constructor(endpoint: string) {
    this.client = new Client({
      ...AwsSigv4Signer({
        region: process.env.AWS_REGION ?? 'us-east-1',
        getCredentials: defaultProvider(),
      }),
      node: `https://${endpoint}`,
    });
  }

  async searchStudents(input: SearchStudentsInput): Promise<SearchStudent[]> {
    const must: Record<string, unknown>[] = [
      {
        multi_match: {
          query: input.query,
          fields: ['firstName', 'lastName'],
          type: 'phrase_prefix',
        },
      },
    ];

    if (input.schoolId) {
      must.push({ term: { 'schoolId.keyword': input.schoolId } });
    }

    try {
      const result = await this.client.search({
        index: 'students',
        body: {
          query: { bool: { must } },
        },
      });

      const hits = result.body.hits.hits as unknown as Array<{
        _id: string;
        _source: {
          firstName: string;
          lastName: string;
          schoolId: string;
          enrolledAt: string;
        };
      }>;

      return hits.map((hit) => ({
        id: hit._id,
        firstName: hit._source.firstName,
        lastName: hit._source.lastName,
        schoolId: hit._source.schoolId,
        enrolledAt: hit._source.enrolledAt,
      }));
    } catch (err: unknown) {
      const meta = (err as { meta?: { statusCode?: number; body?: unknown } })
        .meta;
      console.error('OpenSearch query failed', {
        statusCode: meta?.statusCode,
        body: JSON.stringify(meta?.body),
        message: err instanceof Error ? err.message : err,
      });
      // Index doesn't exist yet — no students have been enrolled
      if (meta?.statusCode === 404) {
        return [];
      }
      throw err;
    }
  }
}
