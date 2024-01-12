import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './style.module.scss';
import DeleteIcImg from '../../../images/delete_ic.svg';
import ModalDelete from '../../ModelDelete/ModalDelete';
import { chatApi } from '../../../redux/services/chatService';
import { useDispatch } from 'react-redux';
import { setChats } from '../../../redux/slices/chatSlice';
import { createPortal } from 'react-dom';

const SideBarSession = ({ session }) => {
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
          <img src={DeleteIcImg} alt="" onClick={() => setDeleteFolder2(true)} />
        </Link>
      </li>
    </>
  );
};

export default SideBarSession;
