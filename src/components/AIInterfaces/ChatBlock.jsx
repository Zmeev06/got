import React, { useState, useEffect } from 'react'
import GptUser from '../../images/chat/mi_ic.png';
import MessageGpt from '../MessageGpt/MessageGpt'
import MessageMy from '../MessageMy/MessageMy'
import GptChat from '../../images/chat/chatgpt_ic.png';
import PublicModal from '../PublicModal/PublicModal'


const ChatBlock = ({ setMessages, chatId, newChatName, messages, scrollBottom }) => {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    const [modal, setModal] = useState(false)
    const setModalClick = () => {
        setModal(!modal);
    };
    const [messagesWidth, setMessagesWidth] = useState(messages.length)

    setTimeout(() => {
        lastMessageScroll('smooth');
        if (messages.length != messagesWidth) lastMessageScroll('smooth');
    }, [])


    function lastMessageScroll(b) {

        if (!scrollBottom.current) return;

        scrollBottom.current.scrollIntoView({
            behavior: b || 'auto',
            block: 'end',
        });
    }
    function handleError(data) {
        console.log(data.error);
    }
    function newChatName(e) {
        if (messages.length == 0) {

            fetch(`https://ziongpt.ai/api/v1/chatsession/${window.location.href.split('/')[window.location.href.split('/').length - 1]}/`, {

                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + getCookie("token"),
                },
                body: JSON.stringify({
                    "name": e.substring(0, 15)
                })
            }).then(response => response.json())
                .then(data => console.log(data));
        }
    }

    async function newChatReq(message) {

        if (message.length > 0) {

            newChatName(message);
            if (message.trim() !== '') {
                iMessages = [...messages, {
                    messageText: message,
                    avatar: GptUser,
                    mine: true
                }, {
                    messageText: '',
                    avatar: GptChat,
                    mine: false
                }]
                setMessages(iMessages);
            }


            var response = await fetch('https://ziongpt.ai/api/v1/run-generation/', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + getCookie("token"),
                },
                body: JSON.stringify({
                    "session_id": chatId,
                    "prompt": message,
                    "folder": null,

                })
            });
            if (!response.ok) {
                handleError(await response.json())
                return;
            }

            const reader = response.body.getReader();
            let chunks = [];

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                chunks.push(value);

                const jsonStrings = new TextDecoder('utf-8').decode(value).split('}').filter(Boolean).map(str => str + '}');

                const objects = jsonStrings.map(JSON.parse);
                objects.forEach(el => {
                    if (el.content != null) {
                        iMessages.at(-1).messageText += el.content;
                    }
                });
                setMessages([...iMessages]);
            }
            const text1 = new TextDecoder('utf-8').decode(new Uint8Array(chunks.flat()));
        }

    }

    let iMessages = []

    useEffect(() => {
        fetchMessages()
    }, [chatId]);

    function fetchMessages() {
        fetch(`https://ziongpt.ai/api/v1/messages/${chatId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + getCookie("token"),
            }
        })

            .then(response => {

                if (!response.ok) {

                    return Promise.reject(response.json());
                }
                return response.json()
            })

            .then(data => {
                iMessages = data.messages.map(e => [{
                    messageText: e.text,
                    avatar: GptUser,
                    mine: true
                }, {
                    messageText: e.answer,
                    avatar: GptChat,
                    mine: false
                }]

                ).flat()
                setMessages(
                    iMessages
                );
            }, handleError)
    }

    return (
        <div >
            <div className="">
                {modal && (
                    <PublicModal setModalClick={setModalClick} />
                )}
                <div className="content__chat">
                    {messages.map((message, index) => {
                        return <MessageMy setMessages={setMessages} chatId={chatId} newChatName={newChatName} key={index} index={index} messages={messages} messageText={message.messageText} avatar={message.avatar} mine={message.mine} />
                    })}
                    {/* <MessageMy />

                    <MessageGpt /> */}

                </div>
                {/* <GptInterface setMessages={setMessages} messages={messages} setModalClick={setModalClick} newChat={true} /> */}


                <a href="#bottom" className="to_bottom bottom chat_con" ref={scrollBottom}><img src="./assets/assets/images/to_b_arr.svg" alt="" /></a>
            </div>
        </div>
    )
}

export default ChatBlock