// import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { Header } from './header/header';
import { OnboardWithTrpc } from '@bawp/onboard-ui';
import { GetReady } from '@bawp/get-ready-ui';
import type { GetReadyContract } from '@bawp/get-ready-ui';

const ONBOARD_API_URL =
  'https://cfpqdc7w5acfqsz432uouka4xy0joyyq.lambda-url.us-east-1.on.aws';

const getReadyContract: GetReadyContract = {
  async listSchools() {
    const res = await fetch(
      `${ONBOARD_API_URL}/schools.list?batch=1&input=${encodeURIComponent(JSON.stringify({ '0': {} }))}`
    );
    const json = await res.json();
    return json[0].result.data;
  },
};

export function App() {
  return (
    <div>
      <Header />
      <br />
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route
          path="/onboard"
          element={
            <div>
              <OnboardWithTrpc apiUrl={ONBOARD_API_URL} />
            </div>
          }
        />
        <Route
          path="/get-ready"
          element={<GetReady contract={getReadyContract} />}
        />
        <Route path="/create" element={<div>Create</div>} />
      </Routes>
    </div>
  );
}

export default App;
