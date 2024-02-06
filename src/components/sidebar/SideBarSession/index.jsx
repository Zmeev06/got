import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './style.module.scss';
import BorderColorIcImg from '../../../images/border_color_ic.svg';
import DeleteIcImg from '../../../images/delete_ic.svg';
import ModalDelete from '../../ModelDelete/ModalDelete';
import { chatApi } from '../../../redux/services/chatService';
import { useDispatch } from 'react-redux';
import { setChats } from '../../../redux/slices/chatSlice';
import { createPortal } from 'react-dom';

const SideBarSession = ({ session, chat }) => {
  const chatId = useParams();
  const [deleteFolder2, setDeleteFolder2] = useState();
  const [deleteChatQuery, { isError: isDeleteChatError }] = chatApi.useDeleteChatMutation();
  const [getChats, { data: chats, isSuccess: isSuccessGetChats, isError: isErrorGetChats }] =
    chatApi.useLazyGetChatsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccessGetChats) {
      dispatch(setChats(chats));
    }
  }, [isSuccessGetChats, chats, dispatch]);

  const [chatVal, setChatVal] = useState(chat?.name);
  const [prevChatVal, setPrevChatVal] = useState();
  const collapseIcon = useRef();
  const mainIcons = useRef();
  const chatsEdit = useRef();
  const chatSpan = useRef();

  function editChats() {
    chatsEdit.current.className = 'main_input chats';
    chatSpan.current.className = 'display-none';

    setPrevChatVal(chatVal);
    chatsEdit.current.disabled = false;
    chatsEdit.current.focus();
    collapseIcon.current.className = 'actions_sp three';
    mainIcons.current.className = 'actions_sp main display-none';
  }

  const onClickFunc2 = async (value) => {
    const chatPk = session.pk;
    if (value) {
      try {
        await deleteChatQuery({ chat: chatPk }).unwrap();
        await getChats();
      } catch (error) {
        console.error(error);
      }
    } else {
      setDeleteFolder2(value);
    }
  };

  return (
    <>
      {deleteFolder2 && createPortal(<ModalDelete onChange={onClickFunc2} />, document.body)}
      <li>
        <Link
          to={`/chat/${session?.pk}`}
          className={`${styles.link} ${chatId.chatId === session.pk ? 'active' : ''}`}>
          <div className={styles.div}>
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
              className="feather feather-message-square">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {session?.name}
          </div>
          <div className={styles.div}>
            <img src={BorderColorIcImg} alt="" onClick={() => editChats()} />
            <img src={DeleteIcImg} alt="" onClick={() => setDeleteFolder2(true)} />
          </div>
        </Link>
      </li>
    </>
  );
};

export default SideBarSession;
