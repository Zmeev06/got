import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewChatAction = () => {
    const [chatUrl, setChatUrl] = useState(null)

    const createChat = () => {
        fetch(`http://mindl.in:8000/api/v1/chatsession/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + "5634c40cd049a1f7fae91b257803f6db341daba3"
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
            <div onClick={() => createChat()}>
                <button type='button'><span className="plus_sp">+</span> Новый чат</button>
            </div>
        </Link>
    );
};

export default NewChatAction;