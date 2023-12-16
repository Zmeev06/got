import React, { useState, useEffect } from 'react'
import Gpt from '../components/Gpt/Gpt'
import NavigationsMidj from '../components/NavigationsMidj/NavigationsMidj'
import ChatBlock from '../components/ChatBlock/ChatBlock'
import MessageAdd from '../components/MessageAdd/MessageAdd'
import ChatBlockHead from '../components/ChatBlockHead/ChatBlockHead'
import { useParams } from 'react-router-dom';
import { useRef } from 'react'
import MessageMidjorney from '../components/MessageMidjorney/MessageMidjorney'
import axios from "axios";
import {useSelector} from "react-redux";


const MidjourneyPage = ({ folders, chats }) => {
    const { chatId } = useParams();
    const scrollBottom = useRef();
    const [activeItems, setActiveItems] = useState([true, false, false, false, false, false, false,]);
    const [messages, setMessages] = useState([])
    const [midjData, setMidjData] = useState(null)
    const [messagesWidth, setMessagesWidth] = useState(messages.length)
    const [myMessages, setMyMessages] = useState([])
    const [messageType, setMessageType] = useState('text')
    const [isEmpty, setIsEmpty] = useState(true)

    const currentChat = useSelector((state) => state.chat)
    const status = useSelector(state => state.status)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        lastMessageScroll('smooth');
        if (messages.length != messagesWidth) lastMessageScroll('smooth');
    }, [])

    function MidjCallBack(data) {
        setMidjData(data)
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


    let getMessages;
    getMessages = (id) => {
        axios.get(`http://mindl.in:8000/api/v1/messages/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + getCookie("token"),
            }
        })

            .then(res => {
                setMyMessages(res.data)
                if(res.data.messages && res.data.type === 'image') {
                    setMessageType('image')
                    setIsEmpty(false)
                } else {
                    setMessageType('text')
                    setIsEmpty(true)
                }
            })
    };




    useEffect(() => {
        if(currentChat.value) {
            getMessages(currentChat.value)
        }
        if (!myMessages) {
            let chatInterval = setInterval(() => {
                if(currentChat.value) {
                    getMessages(currentChat.value)
                    console.log(myMessages)
                    if(myMessages) {
                        clearInterval(chatInterval)
                    }
                }
            }, 3000)

        }
    }, [currentChat.value])

    function lastMessageScroll(b) {

        if (!scrollBottom.current) return;

        scrollBottom.current.scrollIntoView({
            behavior: b || 'auto',
            block: 'end',
        });
    }



    function newChatName(e, models) {
        let model;
        if (models[0] == true) model = 'gpt-3.5-turbo'
        else if (models[1] == true) model = 'gpt-4'
        else if (models[2] == true) model = 'gpt-4-1106-preview'
        else if (models[3] == true) model = 'mj'
        else if (models[4] == true) model = 'dall-e-2'
        else if (models[5] == true) model = 'dall-e-3'
        else if (models[6] == true) model = 'sd'

        if (messages.length == 0) {
            fetch(`http://mindl.in:8000/api/v1/chatsession/${window.location.href.split('/')[window.location.href.split('/').length - 1]}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + document.cookie.split('=')[1],
                },
                body: JSON.stringify({
                    "ai_model": model,
                    "name": e.substring(0, 15)
                })
            }).then(response => response.json())
                .then(data => console.log(data));
        }
    }
    return (
        <div>
            <div className="content-page">
                <div className="content">
                    <div className="container-back-mid">
                        {messages.length ? <ChatBlockHead /> : null}
                    </div>

                    <div className="container-back-mid">

                        {!messages.length && <NavigationsMidj activeItems={activeItems} setActiveItems={setActiveItems} />}
                    </div>

                    {activeItems[0] || activeItems[1] || activeItems[2] ? (
                        <div className="container-back-mid">
                            {!messages.length && <Gpt />}
                        </div>
                    ) : null}

                        <div className="container-back-mid">
                            {myMessages ? <MessageMidjorney midjData={myMessages} /> : <p>{status.value === 'in_queue' || 'waiting' ? 'В очереди'
                                :status.value === 'in_progress' ? `Генерируем ваше изображение...`
                                    :status.value === 'banned' ? 'Ваше сообщение было заблокировано. Политика не позволяет генерировать подобное. Попробуйте что-нибудь другое'
                                        : 'Во время генерации произошла ошибка. Попробуйте ещё раз, если ошибка повторилась, обратитесь в тех. Поддержку'  }</p>}

                        </div>




                    <ChatBlock type={messageType} setMessages={setMessages} chatId={chatId} newChatName={newChatName} messages={messages} scrollBottom={scrollBottom} />
                    <MessageAdd isEmpty={isEmpty} MidjCallBack={MidjCallBack} activeItems={activeItems} chatId={chatId} setMessages={setMessages} messages={messages} newChatName={newChatName} />
                </div>
            </div>

        </div>
    )
}

export default MidjourneyPage