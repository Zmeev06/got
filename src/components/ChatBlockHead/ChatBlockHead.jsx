import React from 'react'

const ChatBlockHead = ({type}) => {
    return (
        <div>
            <div className="chat_top_header desc">
                <div className="container-chat chat_con">
                    <div className="chat_menu_top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M7.33268 20.1667L8.24935 13.75H3.66602L11.916 1.83337H13.7493L12.8327 9.16671H18.3327L9.16602 20.1667H7.33268Z" fill="#374151" />
                        </svg>
                        {type === 'image' ? 'Midjourney' : 'По умолчанию (GPT-3.5)'}
                    </div>
                </div>

                <div className="top_ic"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3.66602 11V18.3333C3.66602 18.8196 3.85917 19.2859 4.20299 19.6297C4.5468 19.9735 5.01312 20.1667 5.49935 20.1667H16.4993C16.9856 20.1667 17.4519 19.9735 17.7957 19.6297C18.1395 19.2859 18.3327 18.8196 18.3327 18.3333V11" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.6673 5.50016L11.0007 1.8335L7.33398 5.50016" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 1.8335V13.7502" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg></div>
            </div>

            <div className="chat_top_header_mob ch_menu">
                <div className="bars_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 18V16.5H21V18H3ZM3 12.75V11.25H21V12.75H3ZM3 7.5V6H21V7.5H3Z" fill="#B0B0BA" />
                    </svg>
                </div>
                <p className="header_mob_text">Здесь запрос</p>
                <div className="plus_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.25 12.75H5V11.25H11.25V5H12.75V11.25H19V12.75H12.75V19H11.25V12.75Z" fill="#B0B0BA" />
                    </svg>
                </div>
            </div>

        </div>
    )
}

export default ChatBlockHead