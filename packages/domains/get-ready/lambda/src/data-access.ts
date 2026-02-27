import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import type {
  GetReadyDataAccess,
  SearchStudent,
  SearchStudentsInput,
  Session,
  CreateSessionInput,
  ListSessionsInput,
  SessionStudent,
  AddStudentToSessionInput,
  GetSessionStudentsInput,
} from '@bawp/get-ready-router';

export class GetReadyDataAccessImpl implements GetReadyDataAccess {
  private osClient: Client;
  private docClient: DynamoDBDocumentClient;
  private tableName: string;

  constructor(opensearchEndpoint: string, tableName: string) {
    this.osClient = new Client({
      ...AwsSigv4Signer({
        region: process.env.AWS_REGION ?? 'us-east-1',
        getCredentials: defaultProvider(),
      }),
      node: `https://${opensearchEndpoint}`,
    });
    this.docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
    this.tableName = tableName;
  }

  // --- OpenSearch: student search ---

  async searchStudents(input: SearchStudentsInput): Promise<SearchStudent[]> {
    const queryLower = input.query.toLowerCase();
    const filter: Record<string, unknown>[] = [];

    if (input.schoolId) {
      filter.push({ term: { 'schoolId.keyword': input.schoolId } });
    }

    const must: Record<string, unknown>[] = [
      {
        bool: {
          should: [
            {
              multi_match: {
                query: input.query,
                fields: ['firstName', 'lastName'],
                type: 'phrase_prefix',
              },
            },
            {
              wildcard: {
                'firstName.keyword': {
                  value: `*${queryLower}*`,
                  case_insensitive: true,
                },
              },
            },
            {
              wildcard: {
                'lastName.keyword': {
                  value: `*${queryLower}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
          minimum_should_match: 1,
        },
      },
    ];

    try {
      const result = await this.osClient.search({
        index: 'students',
        body: {
          query: { bool: { must, filter } },
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
      if (meta?.statusCode === 404) {
        return [];
      }
      throw err;
    }
  }

  // --- DynamoDB: sessions ---

  async createSession(input: CreateSessionInput): Promise<Session> {
    const id = `session-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
    const session: Session = { id, ...input };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          id,
          entityType: 'SESSION',
          name: input.name,
          schoolId: input.schoolId,
          date: input.date,
        },
      })
    );

    return session;
  }

  async listSessions(input: ListSessionsInput): Promise<Session[]> {
    if (input.schoolId) {
      const result = await this.docClient.send(
        new QueryCommand({
          TableName: this.tableName,
          IndexName: 'SchoolIndex',
          KeyConditionExpression: 'schoolId = :schoolId',
          FilterExpression: 'entityType = :entityType',
          ExpressionAttributeValues: {
            ':schoolId': input.schoolId,
            ':entityType': 'SESSION',
          },
        })
      );
      return (result.Items || []).map((item) => ({
        id: item.id as string,
        name: item.name as string,
        schoolId: item.schoolId as string,
        date: item.date as string,
      }));
    }

    const result = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'EntityTypeIndex',
        KeyConditionExpression: 'entityType = :entityType',
        ExpressionAttributeValues: { ':entityType': 'SESSION' },
      })
    );
    return (result.Items || []).map((item) => ({
      id: item.id as string,
      name: item.name as string,
      schoolId: item.schoolId as string,
      date: item.date as string,
    }));
  }

  async addStudentToSession(
    input: AddStudentToSessionInput
  ): Promise<SessionStudent> {
    const id = `ss-${input.sessionId}-${input.studentId}`;

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          id,
          entityType: 'SESSION_STUDENT',
          sessionId: input.sessionId,
          studentId: input.studentId,
          firstName: input.firstName,
          lastName: input.lastName,
          schoolId: input.schoolId,
        },
      })
    );

    return {
      studentId: input.studentId,
      firstName: input.firstName,
      lastName: input.lastName,
      schoolId: input.schoolId,
    };
  }

  async getSessionStudents(
    input: GetSessionStudentsInput
  ): Promise<SessionStudent[]> {
    const result = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'SessionIndex',
        KeyConditionExpression: 'sessionId = :sessionId',
        ExpressionAttributeValues: {
          ':sessionId': input.sessionId,
        },
      })
    );

    return (result.Items || []).map((item) => ({
      studentId: item.studentId as string,
      firstName: item.firstName as string,
      lastName: item.lastName as string,
      schoolId: item.schoolId as string,
    }));
  }
}
