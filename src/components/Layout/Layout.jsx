import * as React from 'react';
import SideBar from '../sidebar/SideBar';
import { Outlet } from 'react-router-dom'
import styles from './style.module.css'
import { useEffect, useState } from 'react';
export const Layout = ({folders, chats, auth, getCookie}) => {
  return (
    <div className={styles.main}>
      <div className={styles.sidebarMy} >
        {auth && <SideBar folders={folders} chats={chats} auth={auth} getCookie={getCookie} /> }
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};