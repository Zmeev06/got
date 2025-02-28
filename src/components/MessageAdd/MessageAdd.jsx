import React, { useState, useEffect, useRef } from 'react';
import SendMessage from '../../images/chat/sendMes.svg';
import GptUser from '../../images/chat/mi_ic.png';
import GptChat from '../../images/chat/chatgpt_ic.png';
import PublicModal from '../PublicModal/PublicModal';
import { useClickAway } from 'react-use';
import { setNewStatus, setNewTaskId } from '../../redux/slices/statusMidSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setErrorStatus } from '../../redux/slices/errorSlice';
import styles from './styles.module.scss';
import { increment } from '../../redux/slices/counterSlice';
import { chatApi } from '../../redux/services/chatService';
import { setChats } from '../../redux/slices/chatSlice';
import { useWindowSize } from '../../hooks/useWindowSize';

const MessageAdd = ({
  MidjCallBack,
  setMessages,
  messages,
  chatId,
  newChatName,
  activeItems,
  setMessageType,
  setIsEmptyMes,
  text,
  setText,
  blockInput
}) => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const dimensions = useWindowSize();

  const [setting, setSetting] = useState(false);
  const [modal, setModal] = useState(false);
  const settingsModal = useRef(null);
  const dispatch = useDispatch();
  const [getChats, { data: chats, isSuccess: isSuccessGetChats }] = chatApi.useLazyGetChatsQuery();

  useEffect(() => {
    if (isSuccessGetChats) {
      dispatch(setChats(chats));
    }
  }, [isSuccessGetChats, chats, dispatch]);

  useClickAway(settingsModal, () => {
    setSetting(false);
  });

  const setModalClick = () => {
    setModal(!modal);
  };
  const notify = (message) => toast.error(message);
  function handleError(data) {}
  let iMessages = [];
  //gpt
  function fetchMessages() {
    fetch(`https://ziongpt.ai/api/v1/messages/${chatId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + getCookie('token')
      }
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response.json());
        }
        return response.json();
      })

      .then((data) => {
        iMessages = data.messages
          .map((e) => [
            {
              messageText: e.text,
              avatar: GptUser,
              mine: true
            },
            {
              messageText: e.answer,
              avatar: GptChat,
              mine: false
            }
          ])
          .flat();
        setMessages(iMessages);
      }, handleError);
  }

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  const textareaRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
    adjustTextareaHeight(event);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Предотвратить перенос строки в поле ввода

      dimensions.width <= 576
        ? (textareaRef.current.style.height = '60px')
        : (textareaRef.current.style.height = '46px');

      newChatReq();
      if (!document.getElementById('ques_input') == null)
        document.getElementById('ques_input').style.height = '46px';
    }
  };
  const openModalSet = () => {
    setSetting(!setting);
  };

  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 2 + 'px';
  };
  async function newGptReq() {
    if (text.trim() !== '') {
      iMessages = [
        ...messages,
        {
          messageText: text,
          avatar: GptUser,
          mine: true
        },
        {
          messageText: '',
          avatar: GptChat,
          mine: false
        }
      ];
      setMessages(iMessages);
      setText('');
    }

    var response = await fetch('https://ziongpt.ai/api/v1/run-generation/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + getCookie('token')
      },
      body: JSON.stringify({
        session_id: chatId,
        prompt: text,
        folder: null
      })
    });
    if (!response.ok) {
      handleError(await response.json());
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

      const jsonStrings = new TextDecoder('utf-8')
        .decode(value)
        .split('}')
        .filter(Boolean)
        .map((str) => str + '}');

      const objects = jsonStrings.map(JSON.parse);
      objects.forEach((el) => {
        if (el.content !== null) {
          iMessages.at(-1).messageText += el.content;
        }
      });

      setMessages([...iMessages]);
    }
    await getChats();
    const text1 = new TextDecoder('utf-8').decode(new Uint8Array(chunks.flat()));
  }

  async function newChatReq() {
    if (textareaRef.current.value.length > 0) {
      newChatName(textareaRef.current.value, activeItems);

      if (activeItems === 'gpt') {
        await newGptReq();
      } else if (activeItems === 'mj') {
        setTimeout(() => {
          setText('');
          midjourneyTest();
        }, 500);
      }
    }
  }

  function midjourneyTest() {
    let id;
    setIsEmptyMes(false);
    setMessageType('image');
    fetch('https://ziongpt.ai/api/v1/run-generation/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + getCookie('token')
      },
      body: JSON.stringify({
        session_id: chatId,
        action: 'imagine',
        prompt: text
      })
    })
      .then((response) => {
        dispatch(setErrorStatus(response.status));
        return response.json();
      })

      .then((data) => {
        id = data.task_id;
        dispatch(increment());
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
          dispatch(setNewTaskId(chatId));
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
          } else {
          }
          dispatch(setNewStatus(`${data.status}`));
        });
    }, 3000);
  }

  const chooseRef = useRef();

  return (
    <section className={styles.footerContent} id="bottom">
      {modal && <PublicModal setModalClick={setModalClick} />}

      <footer className="footer_f chatgp">
        <div className={`settings_modal ${setting ? 'show' : ''}`} ref={settingsModal}>
          <form>
            <label>
              Анализировать контекст диалога{' '}
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none">
                  <path
                    d="M0.5 9C0.5 4.30558 4.30558 0.5 9 0.5C13.6944 0.5 17.5 4.30558 17.5 9C17.5 13.6944 13.6944 17.5 9 17.5C4.30558 17.5 0.5 13.6944 0.5 9Z"
                    fill="white"
                    stroke="#212121"
                  />
                  <path
                    d="M8.36275 11.0983C8.36275 10.6854 8.45824 10.3104 8.64922 9.97331C8.8402 9.62781 9.06938 9.33708 9.33676 9.10112C9.60413 8.86517 9.8715 8.63764 10.1389 8.41854C10.4063 8.19944 10.6354 7.95927 10.8264 7.69803C11.0174 7.42837 11.1129 7.14185 11.1129 6.83848C11.1129 6.34972 10.9219 5.98315 10.5399 5.73876C10.1675 5.48595 9.6853 5.35955 9.09325 5.35955C8.44392 5.35955 7.91394 5.50281 7.50333 5.78933C7.09272 6.06742 6.88742 6.48034 6.88742 7.02809H5.88477C5.88477 6.22753 6.19511 5.60815 6.8158 5.16994C7.43649 4.72331 8.19564 4.5 9.09325 4.5C9.93357 4.5 10.645 4.70646 11.2275 5.11938C11.8195 5.52388 12.1155 6.09691 12.1155 6.83848C12.1155 7.20084 12.02 7.53792 11.8291 7.84972C11.6381 8.16152 11.4089 8.43539 11.1415 8.67135C10.8742 8.89888 10.6068 9.1264 10.3394 9.35393C10.072 9.58146 9.84286 9.84691 9.65187 10.1503C9.46089 10.4452 9.3654 10.7612 9.3654 11.0983H8.36275ZM8.21951 13.5V12.3624H9.50864V13.5H8.21951Z"
                    fill="#212121"
                  />
                </svg>
              </a>
            </label>
            <div className="btns">
              <button className="yes_btn hover">Да</button>
              <button onClick={openModalSet} className="no_btn">
                Нет
              </button>
            </div>
            <label>
              Нейросеть{' '}
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none">
                  <path
                    d="M0.5 9C0.5 4.30558 4.30558 0.5 9 0.5C13.6944 0.5 17.5 4.30558 17.5 9C17.5 13.6944 13.6944 17.5 9 17.5C4.30558 17.5 0.5 13.6944 0.5 9Z"
                    fill="white"
                    stroke="#212121"
                  />
                  <path
                    d="M8.36275 11.0983C8.36275 10.6854 8.45824 10.3104 8.64922 9.97331C8.8402 9.62781 9.06938 9.33708 9.33676 9.10112C9.60413 8.86517 9.8715 8.63764 10.1389 8.41854C10.4063 8.19944 10.6354 7.95927 10.8264 7.69803C11.0174 7.42837 11.1129 7.14185 11.1129 6.83848C11.1129 6.34972 10.9219 5.98315 10.5399 5.73876C10.1675 5.48595 9.6853 5.35955 9.09325 5.35955C8.44392 5.35955 7.91394 5.50281 7.50333 5.78933C7.09272 6.06742 6.88742 6.48034 6.88742 7.02809H5.88477C5.88477 6.22753 6.19511 5.60815 6.8158 5.16994C7.43649 4.72331 8.19564 4.5 9.09325 4.5C9.93357 4.5 10.645 4.70646 11.2275 5.11938C11.8195 5.52388 12.1155 6.09691 12.1155 6.83848C12.1155 7.20084 12.02 7.53792 11.8291 7.84972C11.6381 8.16152 11.4089 8.43539 11.1415 8.67135C10.8742 8.89888 10.6068 9.1264 10.3394 9.35393C10.072 9.58146 9.84286 9.84691 9.65187 10.1503C9.46089 10.4452 9.3654 10.7612 9.3654 11.0983H8.36275ZM8.21951 13.5V12.3624H9.50864V13.5H8.21951Z"
                    fill="#212121"
                  />
                </svg>
              </a>
            </label>
            <select className="choose" name="choose" id="choose" ref={chooseRef}>
              <option value="GPT-3.5">GPT-3.5</option>
              <option value="GPT-4">GPT-4</option>
              <option value="GPT-4 Turbo">GPT-4 Turbo</option>
            </select>
          </form>
        </div>

        <div className="form__top">
          <span className="form__top-text">
            <p></p>
            <span data-feather="x"></span>
          </span>
          <a href="#" className="regenerate chat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none">
              <path
                d="M0.5 2V5H3.5"
                stroke="#100F0F"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 10V7H8.5"
                stroke="#100F0F"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.245 4.50004C9.99142 3.78343 9.56043 3.14274 8.99227 2.63775C8.4241 2.13275 7.73727 1.77992 6.99586 1.61217C6.25445 1.44441 5.48262 1.46721 4.7524 1.67842C4.02219 1.88964 3.35737 2.28239 2.82 2.82004L0.5 5.00004M11.5 7.00004L9.18 9.18004C8.64263 9.71768 7.97781 10.1104 7.2476 10.3217C6.51738 10.5329 5.74555 10.5557 5.00414 10.3879C4.26273 10.2202 3.5759 9.86732 3.00773 9.36233C2.43957 8.85734 2.00858 8.21664 1.755 7.50004"
                stroke="#100F0F"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Регенерировать
          </a>
        </div>
        <form onSubmit={handleSubmit} className="form_f">
          <div className="input_group">
            <a className="settings_f" onClick={openModalSet} href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-settings">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </a>
            <textarea
              ref={textareaRef}
              className="message__area"
              name="tmp"
              disabled={blockInput}
              id="tmp"
              cols="30"
              rows="1"
              placeholder={
                !blockInput ? 'Отправить сообщение' : 'Вы не можете выполнить больше одного запроса'
              }
              value={text}
              onKeyDown={handleKeyPress}
              onChange={handleChange}></textarea>
            {/* <div onClick={() => setModalClick()} className="tmp_f chat_con" href="public.html">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-file-text">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>{' '}
                  Шаблоны
                </div> */}
            <button className="btn_f" onClick={async () => await newChatReq()}>
              <img src={SendMessage} alt="" />
            </button>
          </div>
        </form>
        <p className="text_f">
          ChatGPT может предоставлять неточную информацию о людях, местах или фактах. Версия ChatGPT
          от 3 августа
        </p>
      </footer>
      <a href="#" className="bottom_ic chat_con">
        ?
      </a>
    </section>
  );
};

export default MessageAdd;
