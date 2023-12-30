import React from 'react';
import SideBarActions from './SideBarActions';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const SideBarHeader = ({ inputValue }) => {
  return (
    <div className="sidebar_menu_top">
      <Link to="/">
        <Logo />
      </Link>
      <SideBarActions inputValue={inputValue} />
    </div>
  );
};

export default SideBarHeader;
