import * as React from 'react';
import SideBar from '../sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import styles from './style.module.scss';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { chatApi } from '../../redux/services/chatService';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../../redux/slices/chatSlice';
export const Layout = ({ auth, getCookie }) => {

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { data: chats, isSuccess } = chatApi.useGetChatsQuery();
  const dispatch = useDispatch();
  const globalChats = useSelector((state) => state.chat);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(setChats(chats));
    }
  }, [isSuccess]);

  const clickHandler = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  React.useEffect(() => {
    console.log(globalChats.chats);
  }, [globalChats.chats])
  return (
    <div className={styles.main}>
      <div
        className={`${styles.sidebarMy} ${isOpenSidebar ? styles.sidebarActive : ''} ${
          !auth ? styles.auth : ''
        }`}>
        {(auth && isSuccess && globalChats.chats.folders) ? (
          <SideBar
            folders={globalChats.chats.folders}
            chats={globalChats.chats.sessions}
            auth={auth}
            getCookie={getCookie}
          />
        ) : (
          <ClipLoader color="white" />
        )}
      </div>
      <div className={`${styles.header}`}>
        <div className="bars_menu" onClick={() => clickHandler()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none">
            <path
              d="M3 18V16.5H21V18H3ZM3 12.75V11.25H21V12.75H3ZM3 7.5V6H21V7.5H3Z"
              fill="#B0B0BA"
            />
          </svg>
        </div>
        <p className="header_mob_text">Здесь запрос</p>
        <div className="plus_menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none">
            <path
              d="M11.25 12.75H5V11.25H11.25V5H12.75V11.25H19V12.75H12.75V19H11.25V12.75Z"
              fill="#B0B0BA"
            />
          </svg>
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
