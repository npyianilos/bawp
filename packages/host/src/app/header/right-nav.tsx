import { TabList } from '@cb/apricot-react';
import { NavItem } from './nav-item';

export const RightNav = () => {
  return (
    <TabList hasIcon style={{ marginLeft: 'auto' }}>
      <NavItem name="Profile" route="/profile" icon="user-circle" />
      <NavItem name="Settings" route="/settings" icon="settings" />
    </TabList>
  );
};
