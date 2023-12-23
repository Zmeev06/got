import React from 'react';
import CloseMenuMobImg from '../../../images/close_menu_mob.png';
import SideBarHeader from "../SideBarHeader";
import SideBarBottomLinks from "../SideBarBottomLinks";
import SideBarUser from "../SideBarUser";
import SideBarFolderList from "../SideBarFolderList";
import { useState } from 'react';
import styles from './styles.module.scss'


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
        <div className={`left-side-menu ${styles.leftSideMenu}`}>
            <div className={styles.content} data-simplebar="init">
                <div className={styles.simplebarWrapper}>
                    <div className={styles.simplebarHeightAutoObserverWrapper}>
                        <div className={styles.simplebarHeightAutoObserver}></div>
                    </div>
                    <div className={styles.simplebarMask}>
                        <div className={styles.simplebarOffset}>
                            <div className={styles.simplebarContentWrapper} tabIndex="0" role="region" aria-label="scrollable content" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                <div className={styles.simplebarContent} style={{ padding: '0' }}>
                                    <div className={styles.sidebarMenu}>
                                        <SideBarHeader inputValue={inputValue}/>
                                        <SideBarFolderList folders={zeroFlag ? folders : foldersArr} chats={zeroFlag ? chats : chatsArr} />
                                        <SideBarBottomLinks />
                                        <SideBarUser auth={auth}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.simplebarPlaceholder}></div>
                </div>
                <div className={styles.simplebarTrackHorizontal}>
                    <div className={styles.simplebarScrollbar} style={{ width: '0px', display: 'none' }}></div>
                </div>
                <div className={styles.simplebarTrackVertical} style={{ visibility: 'visible' }}>
                    <div className={styles.simplebarScrollbar} style={{ height: '603px', display: 'block', transform: 'translate3d(0px, 0px, 0px)' }}></div>
                </div>
            </div>
            <span className={styles.xMenuMob}>
                <img src={CloseMenuMobImg} alt="" />
            </span>
        </div>
    );
};

export default SideBar;