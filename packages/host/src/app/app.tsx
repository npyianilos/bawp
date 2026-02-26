// import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { Header } from './header/header';
import { OnboardWithTrpc } from '@bawp/onboard-ui';

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
              <OnboardWithTrpc apiUrl="https://a7hvippzbwtzpigl7ippdv4yim0frjee.lambda-url.us-east-1.on.aws" />
            </div>
          }
        />
        <Route path="/create" element={<div>Create</div>} />
      </Routes>
    </div>
  );
}

export default App;
