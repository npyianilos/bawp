export type School = {
  id: string;
  name: string;
};

export interface GetReadyPort {
  listSchools(): Promise<School[]>;
}
