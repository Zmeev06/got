
import React, { useEffect, useState } from 'react'
import TabButton from '../UI/tabButton/TabButton'
import RateYes from '../../images/icons/rate_yes.svg'
import RateClose from '../../images/icons/rate_close.svg'
import RateWarning from '../../images/icons/warning.png'
import RateAccept from '../../images/icons/accept.svg'
import { Settings } from "react-feather";
import { Star } from "react-feather";
import { Move } from "react-feather";
import { Link } from 'react-router-dom'


function Rate({ auth }) {
    const [checked, setChecked] = useState(false);
    const [textCheck, setTextCheck] = useState(false)
    const [tariffs, setTariffs] = useState([{
        chatgpt_4_monthly_limit: 15,
        chatgpt_daily_limit: -1,
        code: "mini",
        dalle_2_balance: 0,
        dalle_3_balance: 0,
        days: 30,
        description: "Тариф MINI на месяц",
        id: 2,
        is_active: true,
        is_extra: false,
        main_tariff: null,
        midjourney_monthly_limit: 100,
        name: "MINI",
        price: 450,
        sd_monthly_limit: 50,
    }
        ,
    {
        chatgpt_4_monthly_limit: 30,
        chatgpt_daily_limit: -1,
        code: "pro",
        dalle_2_balance: 0,
        dalle_3_balance: 0,
        days: 30,
        description: "Тариф PRO на месяц",
        id: 2,
        is_active: true,
        is_extra: false,
        main_tariff: null,
        midjourney_monthly_limit: 150,
        name: "PRO",
        price: 450,
        sd_monthly_limit: 50,
    },
    {
        chatgpt_4_monthly_limit: 50,
        chatgpt_daily_limit: -1,
        code: "ultima",
        dalle_2_balance: 0,
        dalle_3_balance: 0,
        days: 30,
        description: "Тариф ULTIMA на месяц",
        id: 14,
        is_active: true,
        is_extra: false,
        main_tariff: null,
        midjourney_monthly_limit: 1000,
        name: "ULTIMA",
        price: 3500,
        sd_monthly_limit: 200
    }
    ])

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => { // получение инфы о тарифах
        fetch('https://ziongpt.ai/api/v1/tariffs/', {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + getCookie("token"),
            }
        })
            .then(response => response.json())
            .then(data => {
                setTariffs(data)

            })

    }, []);

    function allowPayment() {

        if (checked) setChecked(false);
        else {
            setChecked(true);
            setTextCheck(false);
        }
    }

    function errorText() {
        if (!checked) setTextCheck(true);
        else setTextCheck(false);

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


                <section className="rate">
                    <div className="section_title">Выберите тарифный план</div>
                    <div className="rate_block">
                        <div className="rate_item">
                            <div className="rate_item_hov_top">Чаще всего выбирают</div>
                            <div className="rate_item_title">{`Тариф ${tariffs[0].name} за ${tariffs[0].price} ₽ `}<br /> <span>1  месяц</span></div>
                            <ul className="rate_advan">
                                <li><img src={RateYes} alt="" />Доступ без VPN</li>
                                <li><img src={RateYes} alt="" />Не нужен номер телефона <br />  и иностранная карта</li>
                                <li><img src={tariffs[0].chatgpt_daily_limit == -1 ? RateYes : RateClose} alt="" />Безлимит GPT 3,5 Turbo</li>
                                <li><img src={RateYes} alt="" />{tariffs[0].chatgpt_4_monthly_limit} запросов в день к GPT4</li>
                                <li><img src={RateYes} alt="" />{tariffs[0].midjourney_monthly_limit} запросов в день к Midjourney</li>
                                <li><img src={RateYes} alt="" />{tariffs[0].sd_monthly_limit} запросов в месяц к StableDiffusion</li>
                                <li><img src={RateYes} alt="" />Доступ к DALLE-2 и DALLE-3</li>
                                <li><img src={RateClose} alt="" />Доступ к Api GPT и Midjourney</li>
                            </ul>
                            {checked && <Link to={`https://ziongpt.ai/payments/redirect/${tariffs[0].code}/${auth.id}/`} className="rate_action" onClick={() => errorText()}>
                                Выбрать тариф
                            </Link>}
                            {!checked &&
                                <a className="rate_action">Выбрать тариф</a>
                            }
                        </div>
                        <div className="rate_item hover">
                            <div className="rate_item_hov_top">Чаще всего выбирают</div>
                            <div className="rate_item_title">{`Тариф ${tariffs[1].name} за ${tariffs[1].price} ₽ `}<br /><span>1  месяц</span></div>
                            <ul className="rate_advan">
                                <li><img src={RateYes} alt="" />Доступ без VPN</li>
                                <li><img src={RateYes} alt="" />Не нужен номер телефона <br />  и иностранная карта</li>
                                <li><img src={tariffs[1].chatgpt_daily_limit == -1 ? RateYes : RateClose} alt="" />Безлимит GPT 3,5 Turbo</li>
                                <li><img src={RateYes} alt="" />{tariffs[1].chatgpt_4_monthly_limit} запросов в день к GPT4</li>
                                <li><img src={RateYes} alt="" />{tariffs[1].midjourney_monthly_limit} запросов в день к Midjourney</li>
                                <li><img src={RateYes} alt="" />{tariffs[1].sd_monthly_limit} запросов в месяц к StableDiffusion</li>
                                <li><img src={RateYes} alt="" />Доступ к DALLE-2 и DALLE-3</li>
                                <li><img src={RateYes} alt="" />Доступ к Api GPT и Midjourney</li>
                            </ul>
                            {checked && <Link to={`https://ziongpt.ai/payments/redirect/${tariffs[1].code}/${auth.id}/`} className="rate_action" onClick={() => errorText()}>
                                Выбрать тариф
                            </Link>}
                            {!checked &&
                                <a className="rate_action">Выбрать тариф</a>
                            }
                        </div>
                        <div className="rate_item">
                            <div className="rate_item_hov_top">Чаще всего выбирают</div>
                            <div className="rate_item_title">{`Тариф ${tariffs[2].name} за ${tariffs[2].price} ₽ `}<br /> <span>1  месяц</span></div>
                            <ul className="rate_advan">
                                <li><img src={RateYes} alt="" />Доступ без VPN</li>
                                <li><img src={RateYes} alt="" />Не нужен номер телефона <br />  и иностранная карта</li>
                                <li><img src={tariffs[2].chatgpt_daily_limit == -1 ? RateYes : RateClose} alt="" />Безлимит GPT 3,5 Turbo</li>
                                <li><img src={RateYes} alt="" />{tariffs[2].chatgpt_4_monthly_limit} запросов в день к GPT4</li>
                                <li><img src={RateYes} alt="" />{tariffs[2].midjourney_monthly_limit} запросов в день к Midjourney</li>
                                <li><img src={RateYes} alt="" />{tariffs[2].sd_monthly_limit} запросов в месяц к StableDiffusion</li>
                                <li><img src={RateYes} alt="" />Доступ к DALLE-2 и DALLE-3</li>
                                <li><img src={RateYes} alt="" />Доступ к Api GPT и Midjourney</li>
                            </ul>
                            {checked && <Link to={`https://ziongpt.ai/payments/redirect/${tariffs[2].code}/${auth.id}/`} className="rate_action" onClick={() => errorText()}>
                                Выбрать тариф
                            </Link>}
                            {!checked &&
                                <a className="rate_action">Выбрать тариф</a>
                            }

                        </div>
                    </div>
                    <div className="confirm_rate">
                        <label className="generator_check_container" >
                            <input type="checkbox" className="checkbox" onClick={() => allowPayment()} />

                            <span className="checkmark"></span>
                        </label>
                        <p className={textCheck && "error-check"}>
                            Я подтверждаю что я ознакомился со счет <a href="#">офертой</a> и понимаю <br /> что я подключаю подписку с регулярными платежами.
                        </p>
                    </div>
                </section>
            </div>


        </div>

    )
}

export default Rate

