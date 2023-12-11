import React from 'react';

const SearchAction = ({inputValue}) => {
    return (
        <div className="sidebar_menu_top_actions_search">
            <input type="search" name="search" id="search" placeholder="Поиск" onChange={(e) => inputValue(e.target.value)}/>
        </div>
    );
};

export default SearchAction;