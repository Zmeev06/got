import React, { useState } from 'react'
import MessageMy from '../MessageMy/MessageMy'
import PublicModal from '../PublicModal/PublicModal'
import styles from './style.module.scss'

const ChatBlock = ({ setMessages, chatId, newChatName, messages, scrollBottom, type }) => {

    const [modal, setModal] = useState(false)
    const setModalClick = () => {
        setModal(!modal);
    };

    return (
        <div id='chat' className={styles.chatBlock}>
            <div className="">
                {modal && (
                    <PublicModal setModalClick={setModalClick} />
                )}
                <div className="content__chat">
                    {messages.map((message, index) => {
                        if (type !== 'image') {
                            return <MessageMy setMessages={setMessages} chatId={chatId} newChatName={newChatName}
                                              key={index} index={index} messages={messages}
                                              messageText={message.messageText} avatar={message.avatar}
                                              mine={message.mine}/>
                        } else {
                            return null
                        }
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