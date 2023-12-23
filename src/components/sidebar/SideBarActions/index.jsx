import React from 'react';
import NewChatAction from "../NewChatAction";
import NewFolderAction from "../NewFolderAction";
import SearchAction from "../../UI/SearchAction";
import styles from './style.module.scss'

const SideBarActions = ({inputValue}) => {
    return (
        <div className={styles.sidebarMenuTopActions}>
            <div className={styles.sidebarNewChat}>
                <NewChatAction />
                <NewFolderAction />
            </div>
            <SearchAction inputValue={inputValue}/>
        </div>
    );
};

export default SideBarActions;