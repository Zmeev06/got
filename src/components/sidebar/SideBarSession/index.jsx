import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './style.module.scss'


const SideBarSession = ({ session }) => {

    const chatId = useParams()
    // const [chatVal, setChatVal] = useState(session?.name);
    // const [prevChatVal, setPrevChatVal] = useState();
    // const [deleteFolder2, setDeleteFolder2] = useState();

    // const collapseIcon = useRef();
    // const mainIcons = useRef();
    // const chatsEdit = useRef();
    // const chatSpan = useRef();


    // const onClickFunc2 = (value) => {
    //     if (value) {
    //         fetch(`https://ziongpt.ai/api/v1/chatsession/${session?.pk}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "Authorization": "Token " + getCookie("token"),
    //             }
    //     })
    //             .then(data => console.log(data));

    //         setTimeout(() => {
    //             window.location.reload(false);
    //         }, 500)
    //     }
    //     else {

    //         setDeleteFolder2(value)
    //     }
    // }

    // function getCookie(name) {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(';').shift();
    //   }

    // function editChats(){
    //     chatsEdit.current.className = "main_input chats"
    //     chatSpan.current.className = "display-none"

    //     setPrevChatVal(chatVal)
    //     chatsEdit.current.disabled = false;
    //     chatsEdit.current.focus();
    //     collapseIcon.current.className = "actions_sp three"
    //     mainIcons.current.className = "actions_sp main display-none"
    // }

    // function stopChatsEdit(flag){
    //     if (flag) {
    //         chatsEdit.current.disabled = true;
    //         chatsEdit.current.blur();
    //         collapseIcon.current.className = "actions_sp three display-none";
    //         mainIcons.current.className = "actions_sp main";
          
    //         fetch(`https://ziongpt.ai/api/v1/chatsession/${session?.pk}/`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "Authorization": "Token " + getCookie("token"),
    //             },
    //             body: JSON.stringify({
    //                 'name': chatsEdit.current.value,
    //             })

    //         })
    //             .then(response => response.json())
    //             .then(data => console.log(data))

    //         setChatVal(chatsEdit.current.value)
    //     }
    //     else {
    //         chatsEdit.current.disabled = true;
    //         chatsEdit.current.blur();
    //         collapseIcon.current.className = "actions_sp three display-none"
    //         mainIcons.current.className = "actions_sp main"
    //         setChatVal(prevChatVal)
    //     }

        
    //     chatsEdit.current.className = "main_input chats display-none"
    //     chatSpan.current.className = ""
    // }


    console.log(session)
    return (<>
     {/* {deleteFolder2 && <ModalDelete onChange={onClickFunc2} />} */}
        <li >
            <Link to={`/chat/${session?.pk}`} className={`${styles.link} ${chatId.chatId === session.pk ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                {session?.name}
            </Link>

            {/* <Link to={`/chat/${session?.pk}`} className='active'>

                        <FolderIcon />
                        <input type="text" className='main_input chats display-none' value={chatVal} disabled ref={chatsEdit} onChange={(e) => setChatVal(e.target.value)} />
                        <span ref={chatSpan}>{chatVal}</span>
                    </Link>
                    
                        <div className="actions_sp three display-none" ref={collapseIcon}>
                            <svg onClick={() => stopChatsEdit(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <svg onClick={() => stopChatsEdit(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                        <div className="actions_sp chats" ref={mainIcons}>
                            {/* <img src={PaletteIcImg} alt="" /> }
                            <img src={BorderColorIcImg} alt="" onClick={() => editChats()} />
                            <img src={DeleteIcImg} alt="" onClick={() => setDeleteFolder2(true)} />
                        </div> */}

        </li>
    </>
    );
};

export default SideBarSession;