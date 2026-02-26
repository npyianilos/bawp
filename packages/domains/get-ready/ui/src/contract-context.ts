import { createContext, useContext } from 'react';
import type { GetReadyContract } from './contract';

export const ContractContext = createContext<GetReadyContract | null>(null);

export function useGetReadyContract() {
  const value = useContext(ContractContext);
  if (!value)
    throw new Error(
      'useGetReadyContract must be used within <GetReadyProvider>.'
    );
  return value;
}
