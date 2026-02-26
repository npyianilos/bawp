import { AwpLogo } from './logo';
import styles from './header.module.scss';
import { NavBar } from './navbar';
import { RightNav } from './right-nav';

export const Header = () => (
  <div className={styles.header + ' cb-box-shadow-bottom cb-blue2-tint-2'}>
    <AwpLogo size={64} />
    <div className="cb-roboto-bold" style={{ fontSize: 24 }}>
      Authentic Work Platform
    </div>
    <NavBar />
    <RightNav />
  </div>
);
