import React from 'react';
import LogoTopImg from "../../../images/logo-top.svg";
import styles from './style.module.scss'

const Logo = () => {
    return (
        <div className={styles.sidebarMenuTopLogo}>
            <img src={LogoTopImg} alt='' />
        </div>
    );
};

export default Logo;