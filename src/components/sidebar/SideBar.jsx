import React from 'react';
import CloseMenuMobImg from '../../images/close_menu_mob.png';
import SideBarHeader from "./SideBarHeader";
import SideBarBottomLinks from "./SidebarBottomLinks";
import SideBarUser from "./SideBarUser";
import SideBarFolderList from "./SideBarFolderList";
import { useState } from 'react';


const SideBar = ({ folders, chats, auth }) => {
  

    const [foldersArr, setFoldersArr] = useState([]);
    const [chatsArr, setChatsArr] = useState([]);
    const [zeroFlag, setZeroFlag] = useState(true)
  
    const filterData = (searchChar) => {
        setFoldersArr([]);
        setChatsArr([]);
     
        folders.filter(element => {
            const name = element.name.toLowerCase();  
            if(name.includes(searchChar.toLowerCase())){
                setFoldersArr(current => [...current, element])
            } 
        });
        
        chats.filter(element => {
            const name = element.name.toLowerCase(); 
            if(name.includes(searchChar.toLowerCase())){
                setChatsArr(current => [...current, element])
            } 
             });
    }
      
    
    const inputValue = (e) => {
        if(e.length == 0) setZeroFlag(true);
        else{
            setZeroFlag(false)
            filterData(e)
        }
    }



    return (
        <div className="left-side-menu">
            <div className="h-100" data-simplebar="init">
                <div className="simplebar-wrapper" style={{ margin: "0px" }}>
                    <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer"></div>
                    </div>
                    <div className="simplebar-mask">
                        <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                            <div className="simplebar-content-wrapper" tabIndex="0" role="region" aria-label="scrollable content" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                <div className="simplebar-content" style={{ padding: '0' }}>
                                    <div id="sidebar-menu">
                                        <SideBarHeader inputValue={inputValue}/>
                                        <SideBarFolderList folders={zeroFlag ? folders : foldersArr} chats={zeroFlag ? chats : chatsArr} />
                                        <div>
                                            <SideBarBottomLinks />
                                            <SideBarUser auth={auth}/>
                                        </div>

                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simplebar-placeholder" style={{ width: 'auto', height: '983px' }}></div>
                </div>
                <div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}>
                    <div className="simplebar-scrollbar" style={{ width: '0px', display: 'none' }}></div>
                </div>
                <div className="simplebar-track simplebar-vertical" style={{ visibility: 'visible' }}>
                    <div className="simplebar-scrollbar" style={{ height: '603px', display: 'block', transform: 'translate3d(0px, 0px, 0px)' }}></div>
                </div>
            </div>
            <span className="x_menu_mob">
                <img src={CloseMenuMobImg} alt="" />
            </span>
        </div>
    );
};

export default SideBar;