import React, { useEffect } from 'react';
import axios from 'axios';
import './styles/bootstrap.min.css';
import './styles/app.min.css';
import './styles/icons.min.css';
import './styles/swiper-bundle.min.css';
import './styles/style.css';

import SideBar from "./components/sidebar/SideBar";
import WhatPage from './pages/WhatPage';
import RatePage from './pages/RatePage';
import PublicPage from './components/PublicModal/PublicModal';
import MidjourneyPage from './pages/MidjourneyPage';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from 'react-feather';
import { Toaster } from "react-hot-toast";


function App() {
    const [folders, setFolders] = useState([
        {
            pk: 1,
            name: 'Folder-1',
            sessions: [
                {
                    pk: 1,
                    name: 'Session-1-1',
                    aiModel: 'chatgpt'
                },
                {
                    pk: 2,
                    name: 'Session-1-2',
                    aiModel: 'chatgpt'
                },
                {
                    pk: 3,
                    name: 'Session-1-3',
                    aiModel: 'chatgpt'
                }
            ]
        },
        {
            pk: 2,
            name: 'Folder-2',
            sessions: [
                {
                    pk: 4,
                    name: 'Session-2-1',
                    aiModel: 'chatgpt'
                },
                {
                    pk: 5,
                    name: 'Session-2-2',
                    aiModel: 'chatgpt'
                },
                {
                    pk: 6,
                    name: 'Session-2-3',
                    aiModel: 'chatgpt'
                }
            ]
        },
        {
            pk: 3,
            name: 'Folder-3',
            sessions: [
                {
                    pk: 7,
                    name: 'Session-3-1',
                    aiModel: 'chatgpt'
                },
                {
                    pk: 8,
                    name: 'Session-3-2',
                    aiModel: 'chatgpt'
                },
                {
                    pk: 9,
                    name: 'Session-3-3',
                    aiModel: 'chatgpt'
                }
            ]
        }
    ]);

    const [chats, setChats] = useState([

        {
            pk: 1,
            name: 'Chat-1',

        },
        {
            pk: 2,
            name: 'Chat-2',

        },
        {
            pk: 3,
            name: 'Chat-3',

        }
    ]);

    const [auth, setAuth] = useState({

        api_balance: 1,
        api_token: null,
        avatar: "/media/profile_avatar/default.png",
        chatgpt_4_monthly_limit: 100,
        chatgpt_daily_limit: 97,
        context_mode: true,
        dalle_2_balance: 100,
        dalle_3_balance: 100,
        date_joined: "2023-12-04T13:15:30.050306+03:00",
        email: "admin@admin.ru",
        email_confirmed: true,
        first_name: "",
        id: "7ca72ff5-14ce-4e29-b2fb-2b38c73e3d97",
        is_active: true,
        is_staff: true,
        is_superuser: true,
        last_login: "2023-12-12T21:33:56.922971+03:00",
        last_name: "",
        midjourney_monthly_limit: 43,
        sd_monthly_limit: 96,
        username: "admin@admin.ru",
        tariff: {
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
            sd_monthly_limit: 50
        },
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        if (!document.cookie.includes("token=")) {
            document.cookie = `token=5634c40cd049a1f7fae91b257803f6db341daba3`;
            // window.location.href = 'https://ziongpt.ai/';
        }



        console.log(getCookie("token"))


    }, [])

    useEffect(() => { // получение папок и чатов
        fetch('http://mindl.in:8000/api/v1/sessions/', {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + getCookie("token"),
            }
        })
            .then(response => response.json())
            .then(data => {
                setFolders(data.folders)
                setChats(data.sessions)
            })

    }, []);

    useEffect(() => {
        console.log('folders: ' + folders)
        console.log('chats: ' + chats)
    }, [folders, chats]);

    useEffect(() => { // получение папок и чатов
        fetch('http://mindl.in:8000/api/v1/sessions/', {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + getCookie("token"),
            }
        })
            .then(response => response.json())
            .then(data => {
                setFolders(data.folders)
                setChats(data.sessions)

            })

    }, []);



    useEffect(() => { // получение инфы о пользователе
        fetch('http://mindl.in:8000/auth/me/', {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + getCookie("token"),
            }
        })
            .then(response => response.json())
            .then(data => {
                setAuth(data)

            })

    }, []);

    return (
        <>
            <SideBar folders={folders} chats={chats} auth={auth} getCookie={getCookie} />
            <Toaster />
            <Routes>
                {/* <Route path="/" element={<ChatPage />} /> */}
                <Route path="/chat/:chatId" Component={MidjourneyPage} />

                <Route path="/faq" element={<WhatPage />} />
                <Route path="/settings" element={<RatePage auth={auth} />} />
            </Routes>
        </>
    );
}

export default App;
