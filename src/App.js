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

    useEffect(() => {
        fetch('http://mindl.in:8000/api/v1/sessions/', {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + "4c358ff22441bed3c3c55b8e6b7a8ae46bbb1abc",
            }
        })
            .then(response => response.json())
            .then(data => {
                setFolders(data.folders)
                setChats(data.sessions)

            })

    }, []);

    return (

        <BrowserRouter>
            {folders && <SideBar folders={folders} chats={chats} />}

            <Routes>
                {/* <Route path="/" element={<ChatPage />} /> */}
                <Route path="/chat/:chatId" Component={MidjourneyPage} />
            
                <Route path="/faq" element={<WhatPage />} />
                <Route path="/settings" element={<RatePage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
