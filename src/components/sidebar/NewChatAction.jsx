import React, {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setNewChat} from "../../redux/slices/chatSlice";
import { increment } from '../../redux/slices/counterSlice';

const NewChatAction = () => {
    const [chatUrl, setChatUrl] = useState(null);
    const dispatch = useDispatch()
    const [newChatUrl, setNewChatUrl] = useState('')
    const navigate = useNavigate()


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    const createChat = () => {
        fetch(`https://ziongpt.ai/api/v1/chatsession/`, {
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
                dispatch(setNewChat(data.pk))
                dispatch(increment())
                navigate(`/chat/${data.pk}`)
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