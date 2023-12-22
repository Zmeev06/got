import * as React from 'react';
import SideBar from '../sidebar/SideBar';
import { Outlet } from 'react-router-dom'
import styles from './style.module.css'
export const Layout = ({folders, chats, auth, getCookie}) => {
  return (
    <div className={styles.main}>
      {auth && <SideBar folders={folders} chats={chats} auth={auth} getCookie={getCookie} /> }
      <Outlet />
    </div>
  );
};