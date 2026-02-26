import { Icon, IconName, Tab } from '@cb/apricot-react';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
  route: string;
  name: string;
  icon: IconName;
};

export const NavItem: React.FC<NavItemProps> = ({ name, route, icon }) => {
  return (
    <NavLink to={route} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Tab selected={isActive}>
          <>
            <Icon name={icon} decorative />
            {name}
          </>
        </Tab>
      )}
    </NavLink>
  );
};
