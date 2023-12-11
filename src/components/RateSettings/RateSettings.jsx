import React, { useState } from 'react'
import Google from "../../images/icons/google.png"
import Vk from "../../images/icons/vk.png"
import Tg from "../../images/icons/tg.png"

const RateSettings = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [oldPassVisible, setOldPassVisible] = useState(false);
    const [passVisible, setPassVisible] = useState(false);
    const [newPassVisible, setNewPassVisible] = useState(false);

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
                                <input type="email" name="email" id="email" value="mukhammaqodir4047@gmail.com" placeholder="mukhammaqodir4047@gmail.com" readOnly />
                            </label>
                            <div className="api_settings_networks">
                                Подключённые соц сети:
                                <ul>
                                    <li><a href="#"><img src={Vk} alt="" /></a></li>
                                    <li><a href="#"><img src={Tg} alt="" /></a></li>
                                    <li><a href="#"><img src={Google} alt="" /></a></li>
                                </ul>
                            </div>
                            <div className="subscription_level">
                                <p>Уровень подписки:</p>
                                <a href="#">Уровень подписки FREE</a>
                                <ul>
                                    <li>- 5 запросов ChatGPT в сутки</li>
                                    <li>- 2 запроса к midjourney в сутки</li>
                                </ul>
                            </div>
                            <button type="submit" className="api_settings_btn">Улучшить тариф</button>
                        </form>
                        <form className="api_settings_form_right" method="get" id="form_validate" onSubmit="return validateForm()">
                            <fieldset>
                                <legend>Старый пароль</legend>
                                <input className="pass" type={oldPassVisible ? 'text' : 'password'} value={oldPassword} placeholder="" name="pass" id="passwordField" onChange={(e) => setOldPassword(e.target.value)} required />
                                <a href="#" className="password_eye" onClick={() => setOldPassVisible(!oldPassVisible)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a>
                            </fieldset>
                            <fieldset>
                                <legend>Новый пароль</legend>
                                <input type={passVisible ? 'text' : 'password'} value={password} name="pass1" id="passwordFieldOne" onChange={(e) => setPassword(e.target.value)} required />
                                <a href="#" className="password_eye" onClick={() => setPassVisible(!passVisible)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a>
                            </fieldset>
                            <fieldset>
                                <legend>Подтвердить пароль</legend>
                                <input type={newPassVisible ? 'text' : 'password'} value={newPassword} name="pass2" id="passwordFieldTwo" onChange={(e) => setNewPassword(e.target.value)} required />
                                <a href="#" className="password_eye" onClick={() => setNewPassVisible(!newPassVisible)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a>
                            </fieldset>
                            <div className="valid_text">
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
                            <button type="submit" className="api_settings_btn">Обновить пароль</button>
                        </form>
                    </div>
                </section>
            </div>


            <div className="mod"></div></div>
    )
}


export default RateSettings