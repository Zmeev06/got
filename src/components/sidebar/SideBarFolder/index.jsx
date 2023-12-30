import React, { useEffect, useRef, useState } from 'react';
import BorderColorIcImg from '../../../images/border_color_ic.svg';
import DeleteIcImg from '../../../images/delete_ic.svg';
import FolderArrowIcon from '../../UI/icons/FolderArrowIcon';
import FolderIcon from '../../UI/icons/FolderIcon';
import SideBarSessionList from '../SideBarSessionList';
import ModalDelete from '../../ModelDelete/ModalDelete';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setChats, setNewChat } from '../../../redux/slices/chatSlice';
import styles from './style.module.scss';
import { chatApi } from '../../../redux/services/chatService';

const SideBarFolder = ({ folder, chat }) => {
  const [deleteFolder, setDeleteFolder] = useState();
  const [deleteFolder2, setDeleteFolder2] = useState();
  const chatId = useParams();
  const [getChats, { data: chats, isSuccess: isSuccessGetChats }] = chatApi.useLazyGetChatsQuery();
  const [deleteFolderQuery, { isSuccess: isSuccessDeleteFolder }] =
    chatApi.useDeleteFolderMutation();
  const dispatch = useDispatch();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  //   const onClickFunc = (value) => {
  //     const folderPk = folder.pk;
  //     if (value) {
  //       deleteFolderQuery({ folder: folderPk }).catch((error) => console.error(error));
  //     } else {
  //       setDeleteFolder(value);
  //     }
  //   };

  //   useEffect(() => {
  //     if (isSuccessDeleteFolder) {
  //       getChats()
  //     }
  //     if (isSuccessDeleteFolder) {
  //       setDeleteFolder(false);
  //       console.log(chats);
  //       dispatch(setChats(chats));
  //     }
  //   }, [isSuccessDeleteFolder, isSuccessGetChats]);
  const onClickFunc = async (value) => {
    const folderPk = folder.pk;
    if (value) {
      try {
        // Выполняем DELETE-запрос
        await deleteFolderQuery({ folder: folderPk }).unwrap();

        // Если DELETE-запрос выполнен успешно, выполняем GET-запрос
        await getChats();
      } catch (error) {
        console.error(error);
      }
    } else {
      setDeleteFolder(value);
    }
  };

  useEffect(() => {
    if (isSuccessGetChats) {
      dispatch(setChats(chats));
    }
  }, [isSuccessGetChats, chats, dispatch]);

  const onClickFunc2 = (value) => {
    if (value) {
      fetch(`https://ziongpt.ai/api/v1/chatsession/${chat.pk}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + getCookie('token')
        }
      }).then((data) => console.log(data));

      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    } else {
      setDeleteFolder2(value);
    }
  };

  const createChat = () => {
    fetch(`https://ziongpt.ai/api/v1/chatsession/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + getCookie('token')
      },
      body: JSON.stringify({
        folder: folder.pk,
        ai_model: 'gpt-3.5-turbo'
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = `/chat/${data.pk}`;
      });
  };

  const [inputVal, setInputVal] = useState(folder?.name);
  const [prevInputVal, setPrevInputVal] = useState();

  const [chatVal, setChatVal] = useState(chat?.name);
  const [prevChatVal, setPrevChatVal] = useState();

  const collapseParent = useRef();
  const collapseChild = useRef();
  const collapseIcon = useRef();
  const mainIcons = useRef();
  const inputEdit = useRef();
  const chatsEdit = useRef();
  const chatSpan = useRef();

  useEffect(() => {
    setChatVal(chat?.name);
  }, [chat]);

  function handleClick() {
    if (collapseChild.current.className !== 'collapse show') {
      collapseChild.current.className = 'collapse show';
      collapseParent.current.className = 'active collapsed';
    } else {
      collapseParent.current.className = '';
      setTimeout(() => {
        collapseChild.current.className = 'collapse';
      }, []);
    }
  }

  function allowEdit() {
    setPrevInputVal(inputVal);
    inputEdit.current.disabled = false;
    inputEdit.current.focus();
    collapseIcon.current.className = 'actions_sp three';
    mainIcons.current.className = 'actions_sp main display-none';
  }

  function editChats() {
    chatsEdit.current.className = 'main_input chats';
    chatSpan.current.className = 'display-none';

    setPrevChatVal(chatVal);
    chatsEdit.current.disabled = false;
    chatsEdit.current.focus();
    collapseIcon.current.className = 'actions_sp three';
    mainIcons.current.className = 'actions_sp main display-none';
  }

  function stopEdit(flag) {
    if (flag) {
      inputEdit.current.disabled = true;
      inputEdit.current.blur();
      collapseIcon.current.className = 'actions_sp three display-none';
      mainIcons.current.className = 'actions_sp main';

      fetch(`https://ziongpt.ai/api/v1/folder/${folder.pk}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + getCookie('token')
        },
        body: JSON.stringify({
          name: inputEdit.current.value
        })
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else {
      inputEdit.current.disabled = true;
      inputEdit.current.blur();
      collapseIcon.current.className = 'actions_sp three display-none';
      mainIcons.current.className = 'actions_sp main';
      setInputVal(prevInputVal);
    }
  }

  function stopChatsEdit(flag) {
    if (flag) {
      chatsEdit.current.disabled = true;
      chatsEdit.current.blur();
      collapseIcon.current.className = 'actions_sp three display-none';
      mainIcons.current.className = 'actions_sp main';

      fetch(`https://ziongpt.ai/api/v1/chatsession/${chat.pk}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + getCookie('token')
        },
        body: JSON.stringify({
          name: chatsEdit.current.value
        })
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      setChatVal(chatsEdit.current.value);
    } else {
      chatsEdit.current.disabled = true;
      chatsEdit.current.blur();
      collapseIcon.current.className = 'actions_sp three display-none';
      mainIcons.current.className = 'actions_sp main';
      setChatVal(prevChatVal);
    }

    chatsEdit.current.className = 'main_input chats display-none';
    chatSpan.current.className = '';
  }

  return (
    // <div key={folder?.pk ?? chat?.id}>
    <>
      {deleteFolder && <ModalDelete onChange={onClickFunc} />}
      {deleteFolder2 && <ModalDelete onChange={onClickFunc2} />}
      {folder ? (
        <li>
          <a ref={collapseParent}>
            <FolderIcon />
            <span className="input_sp">
              <input
                type="text"
                name="main_input"
                id="main_input"
                className="main_input"
                value={inputVal}
                disabled
                ref={inputEdit}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </span>

            <div className="actions_sp three display-none" ref={collapseIcon}>
              <svg
                onClick={() => stopEdit(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-check">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg
                onClick={() => stopEdit(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            {/*редакт*/}
            <div className="actions_sp main" ref={mainIcons}>
              {/* <img src={PaletteIcImg} alt="" /> */}
              <img src={BorderColorIcImg} alt="" onClick={() => allowEdit()} />
              <img src={DeleteIcImg} alt="" onClick={() => setDeleteFolder(true)} />
            </div>
            {/*развернуть*/}
            <div className="folder-arrow" onClick={() => handleClick()}>
              <FolderArrowIcon />
            </div>
          </a>
          <div className="collapse" id="sidebarEcommerce" ref={collapseChild}>
            <SideBarSessionList sessions={folder.sessions} createChat={createChat} />
          </div>
        </li>
      ) : (
        <li onClick={() => dispatch(setNewChat(chat.pk))} className="chats__items">
          <Link
            to={`/chat/${chat?.pk}`}
            className={chat ? (chatId.chatId === chat.pk ? styles.activeLink : '') : ''}>
            <FolderIcon />
            <input
              type="text"
              className="main_input chats display-none"
              value={chatVal}
              disabled
              ref={chatsEdit}
              onChange={(e) => setChatVal(e.target.value)}
            />
            <span ref={chatSpan}>{chatVal}</span>
          </Link>

          <div className="actions_sp three display-none" ref={collapseIcon}>
            <svg
              onClick={() => stopChatsEdit(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <svg
              onClick={() => stopChatsEdit(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div className="actions_sp chats" ref={mainIcons}>
            {/* <img src={PaletteIcImg} alt="" /> */}
            <img src={BorderColorIcImg} alt="" onClick={() => editChats()} />
            <img src={DeleteIcImg} alt="" onClick={() => setDeleteFolder2(true)} />
          </div>
        </li>
      )}
    </>
    // </div >
  );
};

export default SideBarFolder;
