import { Table, Column, PrimaryButton, NakedButton } from '@cb/apricot-react';
import type { School } from '../types/school.js';

type SchoolListProps = {
  schools: School[];
  selectedSchoolId: string | null;
  loading?: boolean;
  onSelect: (school: School) => void;
  onAdd: () => void;
  onDelete: (school: School) => void;
};

export function SchoolList({
  schools,
  selectedSchoolId,
  loading,
  onSelect,
  onAdd,
  onDelete,
}: SchoolListProps) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2>Schools</h2>
        <PrimaryButton icon="plus" iconLeft onClick={onAdd}>
          Add School
        </PrimaryButton>
      </div>

      <Table data={schools} dataLoader={loading} condensed>
        <Column
          field="name"
          title="School Name"
          sortable
          rowHeader
          component={({ value, row }) => {
            const school = row as School;
            return (
              <button
                onClick={() => onSelect(school)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: school.id === selectedSchoolId ? 'bold' : 'normal',
                  textDecoration: 'underline',
                  padding: 0,
                  color: 'inherit',
                }}
              >
                {value as string}
              </button>
            );
          }}
        />
        <Column
          field="actions"
          title=""
          component={({ row }) => {
            const school = row as School;
            return (
              <NakedButton small onClick={() => onDelete(school)}>
                Delete
              </NakedButton>
            );
          }}
        />
      </Table>

      {!loading && schools.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
          No schools yet. Click &quot;Add School&quot; to get started.
        </p>
      )}
    </div>
  );
}
