import React from 'react';

const TabButton = ({ href, children, DataFeather = null, isActive, setActiveTab, id }) => {
    return (
        <li className={isActive ? 'active' : ''}>
            <a href={href} onClick={() => setActiveTab(id)}>
                {DataFeather && <span><DataFeather /></span>}
                {children}
            </a>
        </li>
    );
}

export default TabButton;