// import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { Header } from './header/header';
import { OnboardUi } from '@bawp/onboard-ui';

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
              <OnboardUi />
            </div>
          }
        />
        <Route path="/create" element={<div>Create</div>} />
      </Routes>
    </div>
  );
}

export default App;
