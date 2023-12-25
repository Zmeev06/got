import React from 'react';
import SideBarFolder from "../SideBarFolder";
import styles from './style.module.scss'

const SideBarFolderList = ({ folders, chats }) => {
    return (
        <ul id="side-menu" className={styles.main}>
            {folders.map((folder) =>
                <SideBarFolder key={folder.pk} folder={folder} />
            )}
            {chats.map((chat) =>
                <SideBarFolder key={chat.pk} chat={chat} />
            )}
            {/* <div className="menu-title mt-2">Вчера</div> */}
        </ul>
    );
};

export default SideBarFolderList;