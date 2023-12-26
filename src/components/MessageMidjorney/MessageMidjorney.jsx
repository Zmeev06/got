import React, { useEffect, useState } from 'react';
import MidImg from '../../images/midjorney/bears.png';
import styles from './style.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setNewStatus } from '../../redux/slices/statusMidSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import gptBot from '../../images/chat/chatgpt_ic.png'

const MessageMidjorney = ({ message, midjData, MidjCallBack, type, index }) => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const notify = (message) => toast.error(message);
  const status = useSelector(state => state.status)
  const [activeBtn, setActiveBtn] = useState('')
  const notifyGeneration = (message) => toast.error('Дождитесь окончания генерации');
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const getImage = (option) => {
    let id;
    axios
      .post(
        'https://ziongpt.ai/api/v1/run-generation/',
        {
          session_id: chatId,
          message_id: message.pk,
          action: option.split('-')[0],
          index: option.split('-')[1]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + getCookie('token')
          }
        }
      )
      .then((res) => {
        id = res.data.task_id;
      });

    let MjInterval = setInterval(() => {
      fetch('https://ziongpt.ai/api/v1/check-status/', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + getCookie('token')
        },
        body: JSON.stringify({
          task_id: id
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'ready') {
            clearInterval(MjInterval);
            MidjCallBack(data.result);
            dispatch(setNewStatus(`${data.status}`));
          } else if (data.status === 'banned') {
            clearInterval(MjInterval);
            notify(
              `Ваше сообщение было заблокировано. Политика не позволяет генерировать подобное. Попробуйте что-нибудь другое`
            );
          } else if (data.status === 'error') {
            clearInterval(MjInterval);
            notify(
              'Во время генерации произошла ошибка. Попробуйте ещё раз, если ошибка повторилась, обратитесь в тех. Поддержку'
            );
          }
          dispatch(setNewStatus(`${data.status}`));
        });
    }, 3000);
  };

  const buttonClickHandler = (variant) => {
    setActiveBtn(variant)
    setTimeout(() => {
      setActiveBtn('')
      const chat = document.querySelector('#chat')
      chat.scrollIntoView({behavior: 'smooth'})
    }, 300)
    if(status.value !== 'ready') {
      notifyGeneration()
    } else {
      getImage(variant)
    }
  }

  return (
    <div className={styles.root} style={{
      background: index % 2 === 0 ? '#F7F7F8' : 'transparrent'
    }}>
    <div className={styles.main} >
      <div Name="chat_code_chatgpt">
        {type === 'image' && message && (
          <div className="midjourney_chat">
            <img src={gptBot} alt="" className={styles.img}/>
            <img className="chat_code_img" src={message.result} alt="" />
            <div className="midjourney_chat_right">
              <form className="midjourney_chat_form">
                {message.action !== 'upsample' && (
                  <>
                    <div className="midjourney_chat_label">
                      V - сделать еще 4 похожих изображения на конкретную картинку. <br />U - выдать
                      конкретное изображение в большом разрешении.
                    </div>
                    <div className="midjourney_chat_box">
                      {/* <input type="text" name="a1" id="a_one" value="A1" />
                                <input type="text" name="a2" id="a_two" value="A2" />
                                <input type="text" name="a3" id="a_three" value="A3" />
                                <input type="text" name="a4" id="a_four" value="A4" /> */}
                      <a className={`midjourney_chat_item ${activeBtn === 'variation-1' ? 'midjourney_chat_item_active' : ''}`} onClick={() => buttonClickHandler('variation-1')}>
                        V1
                      </a>
                      <a className={`midjourney_chat_item ${activeBtn === 'variation-2' ? 'midjourney_chat_item_active' : ''}`} onClick={() => buttonClickHandler('variation-2')}>
                        V2
                      </a>
                      <a className={`midjourney_chat_item ${activeBtn === 'variation-3' ? 'midjourney_chat_item_active' : ''}`} onClick={() => buttonClickHandler('variation-3')}>
                        V3
                      </a>
                      <a className={`midjourney_chat_item ${activeBtn === 'variation-4' ? 'midjourney_chat_item_active' : ''}`} onClick={() => buttonClickHandler('variation-4')}>
                        V4
                      </a>
                      <a className={`midjourney_chat_item ${activeBtn === 'upsample-1' ? 'midjourney_chat_item_active' : ''}`} onClick={() => buttonClickHandler('upsample-1')}>
                        U1
                      </a>
                      <a className={`midjourney_chat_item ${activeBtn === 'upsample-2' ? 'midjourney_chat_item_active' : ''}`} onClick={() => buttonClickHandler('upsample-2')}>
                        U2
                      </a>
                      <a className={`midjourney_chat_item ${activeBtn === 'upsample-3' ? 'midjourney_chat_item_active' : ''}`} onClick={() => buttonClickHandler('upsample-3')}>
                        U3
                      </a>
                      <a className={`midjourney_chat_item ${activeBtn === 'upsample-4' ? 'midjourney_chat_item_active' : ''}`} onClick={() => buttonClickHandler('upsample-4')}>
                        U4
                      </a>
                    </div>
                  </>
                )}
                <a
                  href={midjData.messages[midjData.messages.length - 1].result}
                  download={true}
                  target="_blank"
                  className="midjourney_chat_btn"
                  style={{ marginTop: 10 }}>
                  Скачать
                </a>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MessageMidjorney;
