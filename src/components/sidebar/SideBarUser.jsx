import React from 'react';
import DefaultAvatarImg from "../../images/default_avatar.png";
import { Link } from 'react-router-dom';

const SideBarUser = ({auth}) => {
 
    return (
        <div className="user_block">
            <div className="user-box text-center">
                <img src={auth.avatar} alt="user-img" title="Mat Helme" className="rounded-circle avatar-md" />
                <div className="user_content">
                    <div className="user_name">
                        <a href="#" className="text-white">{auth.username}</a>
                    </div>
                    <a href="#" className="text-muted user_email">{auth.email}</a>
                </div>
                <a className="free_btn" href="#">{auth.tariff.name}</a>
            </div>
            {auth.tariff.name != "PRO" && auth.tariff.name != "ULTIMA" && <div className="user_box_bottom">
            <Link to="/settings" state={{
                    plan: true,
                }} className="user_box_bottom_action" >
               Обновить до Про
            </Link>
            </div>}
        </div>
    );
};

export default SideBarUser;