import React from 'react';
import SideBarFolder from "./SideBarFolder";

const SideBarFolderList = ({ folders, chats }) => {
    return (
        <ul id="side-menu" style={{ marginBottom: '100px' }}>
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