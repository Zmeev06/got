import React from 'react'
import GptAva from '../../images/chat/chatgpt_ic.png'
const itemData = {
    content: 'Я не могу найти информации о конкретном "Uzum Market". Можете уточнить, о какой стране или регионе идет речь?',
};

const MessageGpt = () => {
    return (
        <div>
            <div className="chat_chatgpt mob_h chat_p">
                <div className="container-chat chat_con">
                    <div className="chat_chatgpt_block">
                        <a href="#"><img src={GptAva} alt="" /></a>

                        <div className="chat_text">
                            {itemData.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageGpt