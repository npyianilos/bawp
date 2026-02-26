export type School = {
  id: string;
  name: string;
};

export interface GetReadyContract {
  listSchools(): Promise<School[]>;
}
