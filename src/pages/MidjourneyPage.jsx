/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Gpt from '../components/Gpt/Gpt';
import NavigationsMidj from '../components/NavigationsMidj/NavigationsMidj';
import ChatBlock from '../components/ChatBlock/ChatBlock';
import MessageAdd from '../components/MessageAdd/MessageAdd';
import ChatBlockHead from '../components/ChatBlockHead/ChatBlockHead';
import { useRef } from 'react';
import MessageMidjorney from '../components/MessageMidjorney/MessageMidjorney';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageMy from '../components/MessageMy/MessageMy';
import gptBot from '../images/chat/chatgpt_ic.png';
import { setNewStatus } from '../redux/slices/statusMidSlice';
import TokenModal from '../components/tokenModal/TokenModal';
import { MidjourneySlider } from '../components/MidjourneySlider';
import { messagesApi } from '../redux/services/messagesService';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const MidjourneyPage = () => {
  const { chatId } = useParams();
  const scrollBottom = useRef();
  const [activeTab, setActiveTab] = useState('gpt');
  const [messages, setMessages] = useState([]);
  const [midjData, setMidjData] = useState(null);
  const [messagesWidth, setMessagesWidth] = useState(messages.length);
  const [myMessages, setMyMessages] = useState({ type: 'text', messages: [] });
  const [messageType, setMessageType] = useState('');
  const status = useSelector((state) => state.status);
  const [firstMessage, setFirstMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('В очереди');
  const [chatType, setChatType] = useState();
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const [isEmptyMes, setIsEmptyMes] = useState(true);
  const [blockInput, setBlockInput] = useState(false);
  const [text, setText] = useState('');
  const [
    getMessagesQuery,
    {
      data: myMessagesRtk,
      isError: isGetMessagesError,
      isLoading: isGetMessagesLoading,
      isSuccess: isGetMessagesSuccess
    }
  ] = messagesApi.useLazyGetMessagesQuery();

  const notify = (message) => toast.error(message);

  useEffect(() => {
    lastMessageScroll('smooth');
    if (messages.length !== messagesWidth) lastMessageScroll('smooth');
  }, []);

  useEffect(() => {
    if (!isGetMessagesError) {
      setMyMessages(myMessagesRtk);
    }
    if (isGetMessagesError) {
      setMyMessages({ type: 'text', messages: [] });
      notify('Произошла ошибка, повторите попытку позже');
    }
    if (isGetMessagesSuccess) {
      setMessageType(myMessagesRtk.type);
    }
  }, [myMessagesRtk, isGetMessagesError, isGetMessagesSuccess]);

  function MidjCallBack(data) {
    setMidjData(data);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    dispatch(setNewStatus('ready'));
  }, [chatId]);

  useEffect(() => {
    getMessagesQuery({ id: chatId });
    if (status.value === 'ready') {
      setFirstMessage('');
    }
    if (chatId) {
      getMessagesQuery({ id: chatId });
    }
    if (status.value === 'banned') {
      setStatusMessage('Ошибка');
    } else if (status.value === 'error') {
      setStatusMessage('Ошибка');
    } else if (status.value === 'ready') {
      setStatusMessage('');
    } else if (status.value === 'in_proсess') {
      setStatusMessage('Генерация...');
    } else {
      setStatusMessage('В очереди');
    }
  }, [chatId, status.value]);

  useEffect(() => {
    setText('');
  }, [chatId]);

  function lastMessageScroll(b) {
    if (!scrollBottom.current) return;

    scrollBottom.current.scrollIntoView({
      behavior: b || 'auto',
      block: 'end'
    });
  }

  function newChatName(e, models) {
    let model;
    if (models === 'gpt') model = 'gpt-3.5-turbo';
    // else if (models[1] === true) model = 'gpt-4';
    // else if (models[2] === true) model = 'gpt-4-1106-preview';
    else if (models === 'mj') model = 'mj';
    else if (models[4] === true) model = 'dall-e-2';
    else if (models[5] === true) model = 'dall-e-3';
    else if (models[6] === true) model = 'sd';
    setFirstMessage(e);
    if (messages.length === 0) {
      fetch(
        `https://ziongpt.ai/api/v1/chatsession/${
          window.location.href.split('/')[window.location.href.split('/').length - 1]
        }/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + getCookie('token')
          },
          body: JSON.stringify({
            ai_model: model,
            name: e.substring(0, 15)
          })
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFirstMessage(data.name);
        });
    }
  }

  useEffect(() => {
    if (firstMessage || !messages.length) {
      setIsEmptyMes(false);
    }
  }, [firstMessage]);

  useEffect(() => {
    console.log(myMessagesRtk);
    if (isGetMessagesSuccess) {
      if (myMessagesRtk.type === 'image') {
        setBlockInput(true);
      } else if (myMessagesRtk.type === 'text') {
        setBlockInput(false);
      }
    }
  }, [myMessagesRtk]);

  return (
    <div>
      <div className={`content-page ${isGetMessagesLoading ? 'content-page-loader' : ''}`}>
        {myMessages ? (
          <div className="content">
            <div className="container-back-mid">
              {(messages && messages.length) || myMessages.messages.length > 0 ? (
                <ChatBlockHead type={messageType} />
              ) : null}
            </div>

            <div className="container-back-mid">
              {myMessages.messages.length === 0 && !messages.length && (
                <NavigationsMidj activeTab={activeTab} setActiveTab={setActiveTab} />
              )}
            </div>
            {activeTab === 'mj' && (
              <div className="container-back-mid">
                {myMessages.messages.length === 0 && (
                  <MidjourneySlider text={text} setText={setText} />
                )}
              </div>
            )}
            {activeTab === 'gpt' && (
              <div className="container-back-mid">{!messages.length && <Gpt />}</div>
            )}

            <div className="container-back-mid">
              {(chatType === 'mj' || myMessages.type === 'image') && (
                <MessageMy
                  setMessages={setFirstMessage}
                  chatId={chatId}
                  newChatName={newChatName}
                  index={0}
                  messages={[]}
                  messageText={
                    myMessagesRtk.messages.length > 0 ? myMessagesRtk.messages[0].prompt : ''
                  }
                  mine
                  avatar={`https://ziongpt.ai${user.avatar}`}
                />
              )}

              {(chatType === 'mj' || myMessages.type === 'image') &&
                myMessages.messages.length > 0 &&
                myMessages.messages[0].result !== '' &&
                !myMessages.messages[0].result.includes('%') &&
                myMessages.messages.map((item, index) => (
                  <MessageMidjorney
                    message={item}
                    midjData={myMessages}
                    MidjCallBack={MidjCallBack}
                    type={myMessages.type}
                    index={index}
                    key={index}
                  />
                ))}
              <div id="chat" />
              {fetchStatus.value === 426 ? <TokenModal /> : null}
              {messageType !== 'text' &&
                status.taskId === chatId &&
                (status.value === 'in_queue' || status.value === 'waiting' ? (
                  <MessageMy
                    setMessages={setStatusMessage}
                    chatId={chatId}
                    newChatName={newChatName}
                    index={0}
                    messages={[]}
                    messageText={'В очереди'}
                    avatar={gptBot}
                  />
                ) : status.value === 'in_process' ? (
                  <MessageMy
                    setMessages={setStatusMessage}
                    chatId={chatId}
                    newChatName={newChatName}
                    index={0}
                    messages={[]}
                    messageText={'Генерация'}
                    avatar={gptBot}
                  />
                ) : status.value === 'error' ? (
                  <MessageMy
                    setMessages={setStatusMessage}
                    chatId={chatId}
                    newChatName={newChatName}
                    index={0}
                    messages={[]}
                    messageText={'Ошибка'}
                    avatar={gptBot}
                  />
                ) : null)}
            </div>

            {myMessages.type === 'text' || myMessagesRtk.type === 'text' ? (
              <ChatBlock
                type={messageType}
                setMessages={setMessages}
                chatId={chatId}
                newChatName={newChatName}
                messages={messages}
                scrollBottom={scrollBottom}
              />
            ) : null}

            <MessageAdd
              MidjCallBack={MidjCallBack}
              activeItems={activeTab}
              chatId={chatId}
              setMessages={setMessages}
              messages={messages}
              newChatName={newChatName}
              setMessageType={setMessageType}
              setIsEmptyMes={setIsEmptyMes}
              text={text}
              setText={setText}
              blockInput={blockInput}
            />
          </div>
        ) : (
          <ClipLoader />
        )}
      </div>
    </div>
  );
};

export default MidjourneyPage;
