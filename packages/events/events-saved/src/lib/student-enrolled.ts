export const StudentEnrolledEvent = {
  source: 'bawp.enrollment',
  detailType: 'StudentEnrolled',
} as const;

export namespace StudentEnrolledEvent {
  export type Payload = {
    id: string;
    firstName: string;
    lastName: string;
    schoolId: string;
  };
}
