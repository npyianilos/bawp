import { TabList } from '@cb/apricot-react';
import { NavItem } from './nav-item';

export const NavBar = () => {
  return (
    <TabList hasIcon className="cb-padding-left-32">
      <NavItem name="Home" route="/" icon="home" />
      <NavItem name="Onboard" route="/onboard" icon="user-add" />
      <NavItem name="Create" route="/create" icon="compose" />
    </TabList>
  );
};
