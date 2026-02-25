import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import type {
  OnboardDataAccess,
  School,
  Student,
  CreateSchoolInput,
  CreateStudentInput,
} from '@bawp/onboard-router';

export class DynamoOnboardDataAccess implements OnboardDataAccess {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(tableName: string) {
    const client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  async getSchools(): Promise<School[]> {
    const result = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'EntityTypeIndex',
        KeyConditionExpression: 'entityType = :entityType',
        ExpressionAttributeValues: {
          ':entityType': 'SCHOOL',
        },
      })
    );

    return (result.Items || []).map((item) => ({
      id: item.id as string,
      name: item.name as string,
    }));
  }

  async createSchool(data: CreateSchoolInput): Promise<School> {
    const id = `school-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const school: School = { id, name: data.name };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          id,
          entityType: 'SCHOOL',
          name: data.name,
        },
      })
    );

    return school;
  }

  async deleteSchool(id: string): Promise<void> {
    // Delete the school
    await this.docClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      })
    );

    // Delete all students in this school
    const students = await this.getStudents(id);
    await Promise.all(
      students.map((student) =>
        this.docClient.send(
          new DeleteCommand({
            TableName: this.tableName,
            Key: { id: student.id },
          })
        )
      )
    );
  }

  async getStudents(schoolId: string): Promise<Student[]> {
    const result = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'SchoolIndex',
        KeyConditionExpression: 'schoolId = :schoolId',
        FilterExpression: 'entityType = :entityType',
        ExpressionAttributeValues: {
          ':schoolId': schoolId,
          ':entityType': 'STUDENT',
        },
      })
    );

    return (result.Items || []).map((item) => ({
      id: item.id as string,
      firstName: item.firstName as string,
      lastName: item.lastName as string,
      schoolId: item.schoolId as string,
    }));
  }

  async createStudent(data: CreateStudentInput): Promise<Student> {
    const id = `student-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const student: Student = { id, ...data };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          id,
          entityType: 'STUDENT',
          firstName: data.firstName,
          lastName: data.lastName,
          schoolId: data.schoolId,
        },
      })
    );

    return student;
  }

  async deleteStudent(id: string): Promise<void> {
    await this.docClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      })
    );
  }
}
