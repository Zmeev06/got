import React from 'react';
import NewChatAction from "./NewChatAction";
import NewFolderAction from "./NewFolderAction";
import SearchAction from "../UI/SearchAction";

const SideBarActions = ({inputValue}) => {
    return (
        <div className="sidebar_menu_top_actions">
            <div className="sidebar_menu_top_actions_new_chat">
                <NewChatAction />
                <NewFolderAction />
            </div>
            <SearchAction inputValue={inputValue}/>
        </div>
    );
};

export default SideBarActions;