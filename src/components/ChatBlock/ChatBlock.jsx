import React, { useState } from 'react'
import GptUser from '../../images/chat/mi_ic.png';
import MessageGpt from '../MessageGpt/MessageGpt'
import MessageMy from '../MessageMy/MessageMy'
import MessageAdd from '../MessageAdd/MessageAdd'
import GptAva from '../../images/chat/chatgpt_ic.png'
import PublicModal from '../PublicModal/PublicModal'


const ChatBlock = ({ setMessages, chatId, newChatName, messages, scrollBottom }) => {

    const [modal, setModal] = useState(false)
    const setModalClick = () => {
        setModal(!modal);
    };

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
                {/* <MessageAdd setMessages={setMessages} messages={messages} setModalClick={setModalClick} newChat={true} /> */}


                <a href="#bottom" className="to_bottom bottom chat_con" ref={scrollBottom}><img src="./assets/assets/images/to_b_arr.svg" alt="" /></a>
            </div>
        </div>
    )
}

export default ChatBlock