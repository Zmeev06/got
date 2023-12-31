import React from 'react';
import NewFolderIcon from '../UI/icons/NewFolderIcon';
import { chatApi } from '../../redux/services/chatService';
import { useDispatch } from 'react-redux';
import { setChats } from '../../redux/slices/chatSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const NewFolderAction = () => {
  const [createFolderQuery, { isError: isCreateFolderError }] = chatApi.useCreateFolderMutation();
  const [getFolderQuery, { isError: isGetFolderError }] = chatApi.useLazyGetFolderQuery();
  const [getChats, { data: chats, isSuccess: isSuccessGetChats, isError: isErrorGetChats }] =
    chatApi.useLazyGetChatsQuery();
    
  const dispatch = useDispatch();
  const notify = (message) => toast.error(message);

  useEffect(() => {
    if (isSuccessGetChats) {
      dispatch(setChats(chats));
    }
  }, [isSuccessGetChats, chats, dispatch]);

  const newFolder = async () => {
    await createFolderQuery().unwrap();
    await getFolderQuery()
    await getChats();
  };

  useEffect(() => {
    if (isSuccessGetChats) {
      dispatch(setChats(chats));
    }
  }, [isSuccessGetChats, chats, dispatch]);

  useEffect(() => {
    if (isErrorGetChats || isCreateFolderError || isGetFolderError) {
      notify();
    }
  });

  return (
    <div className="folder_sp" onClick={() => newFolder()}>
      <NewFolderIcon />
    </div>
  );
};

export default NewFolderAction;
