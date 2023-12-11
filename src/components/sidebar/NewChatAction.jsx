import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewChatAction = () => {
    const [chatUrl, setChatUrl] = useState(null)

    const createChat = () => {
        fetch(`http://mindl.in:8000/api/v1/chatsession/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + "4c358ff22441bed3c3c55b8e6b7a8ae46bbb1abc"
            }

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.href = `/chat/${data.pk}` 
            })

        
    }

    return (
        <Link to={chatUrl && '/'}>
            <div onClick={()=>createChat()}>
                <button type='button'><span className="plus_sp">+</span> Новый чат</button>
            </div>
        </Link>
    );
};

export default NewChatAction;