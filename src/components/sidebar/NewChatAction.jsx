import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewChatAction = () => {
    const [chatUrl, setChatUrl] = useState(null);

    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    const createChat = () => {
        fetch(`http://mindl.in:8000/api/v1/chatsession/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + getCookie("token"),
            },
            body: JSON.stringify({
                "ai_model": "gpt-3.5-turbo",
            })

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.href = `/chat/${data.pk}`
            })


    }

    return (
        <Link to={chatUrl && '/'}>
            <div onClick={() => createChat()}>
                <button type='button'><span className="plus_sp">+</span> Новый чат</button>
            </div>
        </Link>
    );
};

export default NewChatAction;