import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setChats, setNewChat } from '../../redux/slices/chatSlice';
import { increment } from '../../redux/slices/counterSlice';
import { chatApi } from '../../redux/services/chatService';
import toast from 'react-hot-toast';

const NewChatAction = () => {
  const [chatUrl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createChatQuery, { data, isError, isSuccess }] =
    chatApi.useCreateChatWithoutNameMutation();
  const [getChats, { data: chats, isSuccess: isSuccessGetChats, isError: isErrorGetChats }] =
    chatApi.useLazyGetChatsQuery();
  const notify = (message) => toast.error(message);

  useEffect(() => {
    if (isSuccessGetChats) {
      dispatch(setChats(chats));
    }
  }, [isSuccessGetChats, chats, dispatch]);

  const createChat = async () => {
    await createChatQuery().unwrap();
    await getChats();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setNewChat(data.pk));
      dispatch(increment());
      navigate(`/chat/${data.pk}`);
    }
    if (isError || isErrorGetChats) {
      notify('Произошла ошибка, повторите попытку позже');
    }
  }, [isSuccess, isError, isErrorGetChats]);

  return (
    <Link to={chatUrl && '/'} className="sidebarNewChatLink">
      <div onClick={() => createChat()}>
        <button type="button">
          <span className="plus_sp">+</span> Новый чат
        </button>
      </div>
    </Link>
  );
};

export default NewChatAction;
