
import React from 'react'
import TabButton from '../UI/tabButton/TabButton'
import RateYes from '../../images/icons/rate_yes.svg'
import RateClose from '../../images/icons/rate_close.svg'
import RateWarning from '../../images/icons/warning.png'
import RateAccept from '../../images/icons/accept.svg'
import { Settings } from "react-feather";
import { Star } from "react-feather";
import { Move } from "react-feather";
import { Link } from 'react-router-dom'


function Rate({auth}) {
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


                <section className="rate">
                    <div className="section_title">Выберите тарифный план</div>
                    <div className="rate_block">
                        <div className="rate_item">
                            <div className="rate_item_hov_top">Чаще всего выбирают</div>
                            <div className="rate_item_title">Тариф MINI за 1 ₽ <br /> <span>1  месяц</span></div>
                            <ul className="rate_advan">
                                <li><img src={RateYes} alt="" />Доступ без VPN</li>
                                <li><img src={RateYes} alt="" />Не нужен номер телефона <br />  и иностранная карта</li>
                                <li><img src={RateYes} alt="" />Безлимит GPT 3,5 Turbo</li>
                                <li><img src={RateYes} alt="" />25 запросов в день к Midjourney</li>
                                <li><img src={RateYes} alt="" />25 запросов в день к GPT4</li>
                                <li><img src={RateClose} alt="" />Доступ к Api GPT и Midjourney</li>
                            </ul>
                            <Link to={`https://ziongpt.ai/payments/redirect/mini/<user.id>/`} className="rate_action">
                                Выбрать тариф
                            </Link>
                            <div className="warning_mess">
                                <img src={RateWarning} alt="" />
                                <span>Первый месяц за 1 рубль далее по 599₽ в месяц</span>
                            </div>
                        </div>
                        <div className="rate_item hover">
                            <div className="rate_item_hov_top">Чаще всего выбирают</div>
                            <div className="rate_item_title">Тариф PRO за 1 ₽ <br /><span>1  месяц</span></div>
                            <ul className="rate_advan">
                                <li><img src={RateYes} alt="" />Доступ без VPN</li>
                                <li><img src={RateYes} alt="" />Не нужен номер телефона
                                    <br />  и иностранная карта</li>
                                <li><img src={RateYes} alt="" />Безлимит GPT 3,5 Turbo</li>
                                <li><img src={RateYes} alt="" />25 запросов в день к Midjourney</li>
                                <li><img src={RateYes} alt="" />25 запросов в день к GPT4</li>
                                <li><img src={RateClose} alt="" />Доступ к Api GPT и Midjourney</li>
                            </ul>
                            <Link to={`https://ziongpt.ai/payments/redirect/pro/<user.id>/`} className="rate_action">
                                Выбрать тариф
                            </Link>
                            <div className="warning_mess">
                                <img src={RateWarning} alt="" />
                                <span>Первый месяц за 1 рубль далее по 599₽ в месяц</span>
                            </div>
                        </div>
                        <div className="rate_item">
                            <div className="rate_item_hov_top">Чаще всего выбирают</div>
                            <div className="rate_item_title">Тариф ULTIMA за 1 ₽ <br /> <span>1  месяц</span></div>
                            <ul className="rate_advan">
                                <li><img src={RateYes} alt="" />Доступ без VPN</li>
                                <li><img src={RateYes} alt="" />Не нужен номер телефона
                                    <br />  и иностранная карта</li>
                                <li><img src={RateYes} alt="" />Безлимит GPT 3,5 Turbo</li>
                                <li><img src={RateYes} alt="" />25 запросов в день к Midjourney</li>
                                <li><img src={RateYes} alt="" />25 запросов в день к GPT4</li>
                                <li><img src={RateClose} alt="" />Доступ к Api GPT и Midjourney</li>
                            </ul>
                            <Link to={`https://ziongpt.ai/payments/redirect/ultima/<user.id>/`} className="rate_action">
                                Выбрать тариф
                            </Link>
                            <div className="warning_mess">
                                <img src={RateWarning} alt="" />
                                <span>Первый месяц за 1 рубль далее по 599₽ в месяц</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirm_rate">
                        <label className="generator_check_container">
                            <input type="checkbox" className="checkbox" />

                            <span className="checkmark"></span>
                        </label>
                        <p>
                            Я подтверждаю что я ознакомился со счет <a href="#">офертой</a> и понимаю <br /> что я подключаю подписку с регулярными платежами.
                        </p>
                    </div>
                </section>
            </div>


        </div>

    )
}

export default Rate

