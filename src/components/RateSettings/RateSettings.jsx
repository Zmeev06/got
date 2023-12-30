import React, { useState } from 'react'
import Tg from "../../images/icons/tg.png"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from './styles.module.scss'

const RateSettings = ({auth}) => {
    const user = useSelector(state => state.user)
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [tgAuthRes, setTgAuthRes] = useState()
    const [oldPassVisible, setOldPassVisible] = useState(false);
    const [passVisible, setPassVisible] = useState(false);
    const [newPassVisible, setNewPassVisible] = useState(false);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    function changePass(){
        if(password == newPassword && password.length>=8){
          
                fetch('https://ziongpt.ai/auth/me/change_password/', {
                    method: 'POST',
        
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Token " + getCookie("token"),
                    },
                    body: JSON.stringify({
                        "current_password": oldPassword,
                        "new_password": newPassword                   
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if(data.error == "Incorrect password") alert('Старый пароль - неверный');
                        else alert('Пароль успешно изменен')
                    })
        }
    }

    const tgAuth = (e) => {
        axios
          .post(`/login`, {
            hash: e.hash,
          })
          .then(function (response) {
            //@ts-ignore
            return setTgAuthRes(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    return (
        <div>

            <div className="chat_top_header_mob ap">
                <a href="#" className="bars_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 18V16.5H21V18H3ZM3 12.75V11.25H21V12.75H3ZM3 7.5V6H21V7.5H3Z" fill="#B0B0BA" />
                    </svg>
                </a>
                <p className="header_mob_text">Настройки</p>
                <a href="#" className="plus_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.25 12.75H5V11.25H11.25V5H12.75V11.25H19V12.75H12.75V19H11.25V12.75Z" fill="#B0B0BA" />
                    </svg>
                </a>
            </div>

            <div className="container-back ap_bal_con">

                <section className="api_settings_block">
                    <div className="section_title">Настройки аккаунта</div>
                    <div className="api_settings_content">
                        <form className="api_settings_form_left">
                            <label htmlFor="email">
                                Ваша эл. почта:
                                <input type="email" name="email" id="email" value={auth.email} placeholder={auth.email} readOnly />
                            </label>
                            {user.tg ? <div className="api_settings_networks">
                                Подключённые соц сети:
                                <ul>
                                    <li>
                                        <img src={Tg} alt="" />
                                    </li>
                                </ul>
                            </div> : <div className="api_settings_networks">
                                <ul>
                                <li className={styles.tgBlock} onClick={() =>
                    // @ts-ignore
                    window.Telegram.Login.auth({ bot_id: 6482030236 }, tgAuth)
                  }>
                                            <p>Подключить Telegram</p>
                                            <img src={Tg} alt="" />
                                    </li>
                                    
                                </ul>
                            </div>}
                            
                            <div className="subscription_level">
                                <p>Уровень подписки:</p>
                                <Link to="/settings" state={{
                                    plan: true,
                                }} > 
                                    {`Уровень подписки ${auth.tariff.name}`}
                                </Link>
                               
                                <ul>
                                    <li>- 5 запросов ChatGPT в сутки</li>
                                    <li>- 2 запроса к midjourney в сутки</li>
                                </ul>
                            </div>
                            <Link to="/settings" state={{
                                    plan: true,
                                }} >

                            <button type="submit" className="api_settings_btn">Улучшить тариф</button>
                                </Link>
                        </form>
                        <form className="api_settings_form_right" method="get" id="form_validate" onSubmit="return validateForm()">
                            <fieldset>
                                <legend>Старый пароль</legend>
                                <input className="pass" type={oldPassVisible ? 'text' : 'password'} value={oldPassword} placeholder="" name="pass" id="passwordField" onChange={(e) => setOldPassword(e.target.value)} required />
                                <div className="password_eye" onClick={() => setOldPassVisible(!oldPassVisible)}>
                                    {oldPassVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> : <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zm-176.34-64c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zm235.18-145.4c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z"></path><path d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zm-90.22 73.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z"></path></svg> }</div>
                            </fieldset>
                            <fieldset>
                                <legend>Новый пароль</legend>
                                <input type={passVisible ? 'text' : 'password'} value={password} name="pass1" id="passwordFieldOne" onChange={(e) => setPassword(e.target.value)} required />
                                <div className="password_eye" onClick={() => setPassVisible(!passVisible)}>
                                {passVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> : <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zm-176.34-64c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zm235.18-145.4c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z"></path><path d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zm-90.22 73.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z"></path></svg> }</div>
                            </fieldset>
                <fieldset>
                    <legend>Подтвердить пароль</legend>
                    <input type={newPassVisible ? 'text' : 'password'} value={newPassword} name="pass2"
                           id="passwordFieldTwo" onChange={(e) => setNewPassword(e.target.value)} required />
                    <div className="password_eye" onClick={() => setNewPassVisible(!newPassVisible)}>
                        {newPassVisible ?
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                               className="feather feather-eye">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                          </svg> : <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                                        height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zm-176.34-64c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zm235.18-145.4c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z"></path>
                              <path
                                d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zm-90.22 73.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z"></path>
                          </svg>}</div>
                </fieldset>
                <div className={oldPassword.length >= 8 && password.length >= 8 && newPassword.length >= 8 ? "valid_text" : "valid_text error"}>
                                Ваш пароль должен содержать:
                                <span>
                                    {oldPassword.length >= 8 && password.length >= 8 && newPassword.length >= 8
                                        ? <svg className="valid__svg-success" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7.87565 14.8757L3.20898 10.209L4.10482 9.31315L7.87565 13.084L15.8757 5.08398L16.7715 5.97982L7.87565 14.8757Z" fill="#10A37F" />
                                        </svg>
                                        : <svg className="valid__svg-error" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.1875 15.6875L4.3125 14.8125L9.125 10L4.3125 5.1875L5.1875 4.3125L10 9.125L14.8125 4.3125L15.6875 5.1875L10.875 10L15.6875 14.8125L14.8125 15.6875L10 10.875L5.1875 15.6875Z" fill="#B91C1C" />
                                        </svg>

                                    }

                                    Не менее 8 символов
                                </span>
                            </div>
                            <button type='button' className="api_settings_btn" onClick={changePass}>Обновить пароль</button>
                        </form>
                    </div>
                </section>
            </div>


            <div className="mod"></div></div>
    )
}


export default RateSettings