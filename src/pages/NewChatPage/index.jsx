
import * as React from 'react';
import { setNewChat } from '../../redux/slices/chatSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss'

export const NewChatPage = () => {
  const dispatch = useDispatch()
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
        navigate(`/chat/${data.pk}`)
      })
  }
  return (
    <div className={styles.mainNewChatPage}>
      <div className={styles.newChatButton} onClick={() => createChat()}>
        <p>Создать новый чат</p>
      </div>
    </div>
  );
};