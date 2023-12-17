import React, { useState, useEffect, useRef } from 'react';
import GptUser from '../../images/chat/mi_ic.png';
import ChatEdit from '../../images/chat/chatEdit.svg';

const MessageMy = ({
  setMessages,
  messages,
  chatId,
  newChatName,
  messageText,
  avatar,
  mine,
  index,
  type
}) => {
  const [text, setText] = useState(messageText);
  const [originalText, setOriginalText] = useState(messageText);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const textareaRef = useRef(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };
  let iMessages = [];
  function fetchMessages() {
    fetch(`http://mindl.in:8000/api/v1/messages/${chatId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + getCookie('token')
      }
    })
      .then((response) => response.json())
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
              avatar: GptUser,
              mine: false
            }
          ])
          .flat();
        setMessages(iMessages);
      });
  }

  async function newChatReq() {
    if (textareaRef.current.value.length > 0) {
      newChatName(textareaRef.current.value);
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
            avatar: GptUser,
            mine: false
          }
        ];
        setMessages(iMessages);
        setText('');
      }

      var response = await fetch('http://mindl.in:8000/api/v1/run-generation/', {
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
        throw new Error(`HTTP error! status: ${response.status}`);
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
          if (el.content != null) {
            iMessages.at(-1).messageText += el.content;
          }
        });
        setMessages([...iMessages]);
      }
      const text1 = new TextDecoder('utf-8').decode(new Uint8Array(chunks.flat()));
    }
  }
  const handleSave = () => {
    newChatReq();
    setOriginalText(text);
    setButtonsVisible(false);
  };

  const handleCancel = () => {
    setText(originalText);
    setButtonsVisible(false);
  };

  const handleTextareaFocus = () => {
    setButtonsVisible(true);
  };

  const handleTextareaBlur = () => {
    setButtonsVisible(false);
  };
  console.log(text);
  return (
    <div key={index}>
      <div className={mine ? 'chat_user' : 'chat_chatgpt  mob_h chat_p'}>
        <div className="container-chat chat_con">
          <div className={mine ? 'chat_chatgpt_block' : 'chat_chatgpt_block'}>
            <a href="#">
              <img src={avatar} alt="" />
            </a>
            {mine ? (
              <form className={`user_ques_form ${buttonsVisible ? 'active' : ''}`}>
                <textarea
                  ref={textareaRef}
                  id="ques_input"
                  name="ques_input"
                  placeholder="Что такие Маркетплейсы ?"
                  className="ques_input"
                  cols="100"
                  rows="1"
                  value={text}
                  onChange={handleChange}
                  onFocus={handleTextareaFocus}
                  onBlur={handleTextareaBlur}></textarea>
                <div className="ques_btns">
                  <button type="button" className="save_btn" onClick={handleSave}>
                    Сохранить и отправить
                  </button>
                  <button type="button" className="cancel_btn" onClick={handleCancel}>
                    Отмена
                  </button>
                </div>
              </form>
            ) : (
              <div className="chat_text ">{messageText}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageMy;
