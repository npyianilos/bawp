import { FC } from 'react';
import { GetReadyContract } from '../contract';
import styles from './ui.module.scss';
import { ContractContext } from '../contract-context';

type Props = {
  contract: GetReadyContract;
};

export const GetReady: FC<Props> = ({ contract }) => {
  return (
    <ContractContext.Provider value={contract}>
      <div className={styles['container']}>
        <h1>Welcome to BawpUi!</h1>
      </div>
    </ContractContext.Provider>
  );
};

export default GetReady;
