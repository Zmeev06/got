import React from 'react';
import DefaultAvatarImg from "../../images/default_avatar.png";

const SideBarUser = () => {
    return (
        <div className="user_block">
            <div className="user-box text-center">
                <img src={DefaultAvatarImg} alt="user-img" title="Mat Helme" className="rounded-circle avatar-md" />
                <div className="user_content">
                    <div className="user_name">
                        <a href="#" className="text-white">UserIsName</a>
                    </div>
                    <a href="#" className="text-muted user_email">heremail@mail.ru</a>
                </div>
                <a className="free_btn" href="#">Free</a>
            </div>
            <div className="user_box_bottom">
                <a className="user_box_bottom_action" href="#">Обновить до Про</a>
            </div>
        </div>
    );
};

export default SideBarUser;