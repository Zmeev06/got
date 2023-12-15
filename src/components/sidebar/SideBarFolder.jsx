import React, { useEffect, useRef, useState } from 'react';
import PaletteIcImg from "../../images/palette_ic.svg";
import BorderColorIcImg from "../../images/border_color_ic.svg";
import DeleteIcImg from "../../images/delete_ic.svg";
import FolderArrowIcon from "../UI/icons/FolderArrowIcon";
import FolderIcon from "../UI/icons/FolderIcon";
import SideBarSessionList from "./SideBarSessionList";
import ModalDelete from '../ModelDelete/ModalDelete';
import { Link } from 'react-router-dom';


const SideBarFolder = ({ folder, chat }) => {


    const [deleteFolder, setDeleteFolder] = useState();

    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    const onClickFunc = (value) => {
        if (value) {
            fetch(`http://mindl.in:8000/api/v1/folder/${folder.pk}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + getCookie("token"),
                }
        })
                .then(data => console.log(data));

            setTimeout(() => {
                window.location.reload(false);
            }, 500)
        }
        else {

            setDeleteFolder(value)
        }
    }

    const createChat = () => {
        fetch(`http://mindl.in:8000/api/v1/chatsession/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + getCookie("token"),
            },
            body: JSON.stringify({
                'folder': folder.pk,
                "ai_model": "gpt-3.5-turbo",
          
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.href = `/chat/${data.pk}`
            })


    }

    const [inputVal, setInputVal] = useState(folder?.name);
    const [prevInputVal, setPrevInputVal] = useState();


    const collapseParent = useRef();
    const collapseChild = useRef();
    const collapseIcon = useRef();
    const mainIcons = useRef();
    const inputEdit = useRef();





    function handleClick() {
        if (collapseChild.current.className != "collapse show") {
            collapseChild.current.className = "collapse show"
            collapseParent.current.className = "active collapsed"
        }
        else {
            collapseParent.current.className = "active"
            setTimeout(() => {
                collapseChild.current.className = "collapse"
            }, [])
        }

    }

    function allowEdit() {
        setPrevInputVal(inputVal);
        inputEdit.current.disabled = false;
        inputEdit.current.focus();
        collapseIcon.current.className = "actions_sp three"
        mainIcons.current.className = "actions_sp main display-none"
    }

    function stopEdit(flag) {
        if (flag) {
            inputEdit.current.disabled = true;
            inputEdit.current.blur();
            collapseIcon.current.className = "actions_sp three display-none";
            mainIcons.current.className = "actions_sp main";
            console.log(inputEdit.current.value)
            fetch(`http://mindl.in:8000/api/v1/folder/${folder.pk}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + getCookie("token"),
                },
                body: JSON.stringify({
                    'name': inputEdit.current.value,
                })

            })
                .then(response => response.json())
                .then(data => console.log(data))
        }
        else {
            inputEdit.current.disabled = true;
            inputEdit.current.blur();
            collapseIcon.current.className = "actions_sp three display-none"
            mainIcons.current.className = "actions_sp main"
            setInputVal(prevInputVal)
        }
    }

    const getMessages = () => {
        fetch(`http://mindl.in:8000/api/v1/messages/${folder.pk}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'csrftoken=TUeTRp5vrjwDPP4BjTjJVuq40EKFNnbG; sessionid=s1yyur1j74ab874vjxxmzo9zz9ia3r9v',
                "Authorization": "Token " + getCookie("token"),
            }

        })
            .then(response => response.json())
        /*/убрать авторизацию нужно бэку/*/
    }



    return (

        // <div key={folder?.pk ?? chat?.id}>
        <>
            {deleteFolder && <ModalDelete onChange={onClickFunc} />}
            {folder ?

                <li>

                    <a className="active" ref={collapseParent}>

                        <FolderIcon />
                        <span className="input_sp">
                            <input type="text" name="main_input" id="main_input" className="main_input" value={inputVal} disabled ref={inputEdit} onChange={(e) => setInputVal(e.target.value)} />
                        </span>

                        <div className="actions_sp three display-none" ref={collapseIcon}>
                            <svg onClick={() => stopEdit(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <svg onClick={() => stopEdit(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                        {/*редакт*/}
                        <div className="actions_sp main" ref={mainIcons}>
                            <img src={PaletteIcImg} alt="" />
                            <img src={BorderColorIcImg} alt="" onClick={() => allowEdit()} />
                            <img src={DeleteIcImg} alt="" onClick={() => setDeleteFolder(true)} />
                        </div>
                        {/*развернуть*/}
                        <div className="folder-arrow" onClick={() => handleClick()} >
                            <FolderArrowIcon />
                        </div>
                    </a>
                    <div className="collapse" id="sidebarEcommerce" ref={collapseChild}>

                        <SideBarSessionList sessions={folder.sessions} createChat={createChat} />
                    </div>
                </li> :

                <li>
                    <Link to={`/chat/${chat?.pk}`}>

                        <FolderIcon />
                        {/* <span> {chat?.name} </span> */}
                        <span>{chat?.name}</span>

                    </Link>
                </li>

            }
        </>
        // </div >
    );
};

export default SideBarFolder;