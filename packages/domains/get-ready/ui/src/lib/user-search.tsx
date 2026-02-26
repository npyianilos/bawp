import React, { useState, useCallback } from 'react';
import { InputDropdown } from '@cb/apricot-react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from './trpc.js';
import type { SearchStudent } from '@bawp/get-ready-router';

export type UserSearchProps = {
  schoolId?: string;
  onSelect?: (student: SearchStudent) => void;
};

export const UserSearch = ({ schoolId, onSelect }: UserSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const trpc = useTRPC();

  const { data: students = [] } = useQuery(
    trpc.searchStudents.queryOptions(
      { query: searchTerm, schoolId },
      { enabled: searchTerm.length >= 2 }
    )
  );

  const dataItems = students.map((s) => ({
    label: `${s.firstName} ${s.lastName}`,
    value: s.id,
  }));

  const handleChange = useCallback(
    (
      _event: React.ChangeEvent<HTMLInputElement>,
      value?: string | number | string[]
    ) => {
      setSearchTerm((value ?? '').toString());
    },
    []
  );

  const handleSelect = useCallback(
    (
      _label?: string | number | string[],
      value?: string | number | string[]
    ) => {
      const student = students.find((s) => s.id === value?.toString());
      if (student && onSelect) {
        onSelect(student);
      }
      return value;
    },
    [students, onSelect]
  );

  return (
    <InputDropdown
      label="Search Students"
      placeholder="Type a student name..."
      floating={true}
      clearable={true}
      dataItems={dataItems}
      closeOnSelect={true}
      showNoItemsText={searchTerm.length >= 2 && students.length === 0}
      noItemsText="No students found"
      onChange={handleChange}
      callBack={handleSelect}
    />
  );
};
