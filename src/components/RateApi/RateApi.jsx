import React, { useEffect, useState } from 'react'
import Lock from '../../images/icons/lock.png'
import { Link } from 'react-router-dom';
const RateApi = ({auth}) => {

    const [token, setToken] = useState('Обновите вашу подписку до уровня PRO+ для получения API Токен')

    useEffect(() => { // получение инфы об апи для пользователя
        fetch('http://mindl.in:8000/auth/me/update_token/', {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + "5634c40cd049a1f7fae91b257803f6db341daba3",
            }
        })
            .then(response => response.json())
            .then(data => {
                
                if(data.api_token != null) setToken(data.api_token)
            })

    }, []);

    function getToken(){
        document.getElementById('api').select();    
        document.execCommand("copy");   
    }

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
                {/* <div className="public_tab rate_tab api_tab">
                        <ul>
                            <br />
                            <li><TabButton DataFeather={Settings} href="#">Настройки</TabButton></li>
                            <li><TabButton DataFeather={Star} href="#">Тарифы</TabButton></li>
                            <li><TabButton DataFeather={Move} href="#">Работа с API</TabButton></li>
                        </ul>
                    </div> */}
                <section className="api_block">
                    <div className="section_title">API Midjourney и ChatGPT</div>
                    <div className="api_content">
                        <form className="api_form">
                            <label htmlFor="api" className="api_label desc">
                                Ваш API токен

                                <input type="text" name="api" id="api" placeholder={token} value={token} readOnly />
                            </label>
                            <label htmlFor="api" className="api_label mob">
                                Ваш API токен
                                <input type="text" name="api" id="api" placeholder={token} value={token} readOnly />
                            </label>
                            <Link to={token != 'Обновите вашу подписку до уровня PRO+ для получения API Токен' && "/settings"} state={{
                                    plan: true,
                                }} >

                            <button type="button" className="api_btn" onClick={token != 'Обновите вашу подписку до уровня PRO+ для получения API Токен' && getToken}>Получить Токен</button>
                                </Link>
                        </form>
                        <div className="api_content_bottom">
                            <ul>
                                <li>Лимиты Midjourney: <br />
                                    - 0.2 копейки за каждый запрос</li>
                                <li>Лимиты ChatGPT: <br />
                                    - 0.2 копейки за каждый запрос</li>
                                <li><a href="#">Читать документацию</a></li>
                            </ul>
                            {token == 'Обновите вашу подписку до уровня PRO+ для получения API Токен' && <div className="upgrade_box">
                                <p>
                                    Обновите вашу подписку до уровня PRO + <br /> чтобы иметь возможность пользоваться API
                                    <a href="#">Обновить до уровня PRO +</a>
                                </p>
                                <img src={Lock} alt="" />
                            </div>}
                        </div>
                    </div>
                </section>

            </div>


            <div className="mod"></div>
        </div>
    )
}

export default RateApi