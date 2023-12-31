import React, { useEffect, useState } from 'react';
import DefaultAvatarImg from '../../images/default_avatar.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBarUser = ({ auth }) => {
  const [imgUser, setImgUser] = useState(DefaultAvatarImg);
  const user = useSelector((state) => state.user);
  function changeUrl() {
    setImgUser(`https://ziongpt.ai${auth.avatar}`);
  }

  useEffect(() => {
    changeUrl();
  }, []);

  useEffect(() => {
    if (auth.tariff.name === 'PRO' || auth.tariff.name === 'ULTIMA') {
      console.log(document.querySelector('.side-links'));
      document.querySelector('.side-links').style.bottom = '164px';
    }
  }, []);

  return (
    <div className="user_block">
      <div className="user-box text-center">
        <img
          src={`https://ziongpt.ai${user.avatar}`}
          alt="user-img"
          title="Mat Helme"
          className="rounded-circle avatar-md"
        />
        <div className="user_content">
          <div className="user_name">
            <Link to={'/settings'} className="text-white">
              {auth.username}
            </Link>
          </div>
          <Link to={'/settings'} className="text-muted user_email">
            {auth.email}
          </Link>
        </div>
        <Link
          to={'/settings'}
          state={{
            plan: true
          }}
          className="free_btn">
          {auth.tariff.name}
        </Link>
      </div>

      {auth.tariff.name != 'PRO' && auth.tariff.name != 'ULTIMA' && (
        <div className="user_box_bottom">
          <Link
            to="/settings"
            state={{
              plan: true
            }}
            className="user_box_bottom_action">
            Обновить до Про
          </Link>
        </div>
      )}

      <div className="user_box_bottom">
        <Link to={'https://ziongpt.ai/auth/logout'} className="user_box_bottom_action">
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default SideBarUser;
