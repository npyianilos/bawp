import { createContext, useContext } from 'react';
import type { GetReadyPort } from './port';

export const ContractContext = createContext<GetReadyPort | null>(null);

export function useGetReadyAdapter() {
  const value = useContext(ContractContext);
  if (!value)
    throw new Error(
      'useGetReadyContract must be used within <GetReadyProvider>.'
    );
  return value;
}
