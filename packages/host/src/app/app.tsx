// import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { Header } from './header/header';
import { Onboard } from '@bawp/onboard-ui';
import { GetReady } from '@bawp/get-ready-ui';
import type { GetReadyPort } from '@bawp/get-ready-ui';
import { listSchools } from '@bawp/onboard-public';

const getReadyAdapter: GetReadyPort = {
  async listSchools() {
    const onboardSchools = await listSchools();
    return onboardSchools.map((os) => ({ id: os.id, name: os.name }));
  },
};

export function App() {
  return (
    <div>
      <Header />
      <br />
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route path="/onboard" element={<Onboard />} />
        <Route
          path="/get-ready"
          element={<GetReady adapter={getReadyAdapter} />}
        />
        <Route path="/create" element={<div>Create</div>} />
      </Routes>
    </div>
  );
}

export default App;
