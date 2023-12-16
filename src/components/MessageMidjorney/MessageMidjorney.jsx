import React, {useEffect, useState} from 'react'
import MidImg from '../../images/midjorney/bears.png'
import styles from './style.module.css'
import {useParams} from "react-router-dom";
import axios from "axios";
import {setNewStatus} from "../../redux/slices/statusMidSlice";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";

const MessageMidjorney = ({midjData, MidjCallBack}) => {
    const {chatId} = useParams()
    const dispatch = useDispatch()
    const notify = (message) => toast.error(message);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const getImage = (option) => {
        let id;
        axios.post('http://mindl.in:8000/api/v1/run-generation/', {
            "session_id": chatId,
            "message_id": midjData.messages[midjData.messages.length > 1 ? midjData.messages.length - 2 : 0].pk,
            "action": option.split('-')[0],
            "index": option.split('-')[1]
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + document.cookie.split('=')[1],
            }
        })
            .then(res => {
                id = res.data.task_id
            })

        let MjInterval = setInterval(() => {
            fetch('http://mindl.in:8000/api/v1/check-status/', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + getCookie("token"),
                },
                body: JSON.stringify({
                    "task_id": id
                })
            }).then(response => response.json())
                .then(data => {
                    if (data.status === "ready") {
                        clearInterval(MjInterval)
                        MidjCallBack(data.result)
                        dispatch(setNewStatus(`${data.status}`))
                    } else if (data.status === "banned") {
                        clearInterval(MjInterval)
                        notify(`Ваше сообщение было заблокировано. Политика не позволяет генерировать подобное. Попробуйте что-нибудь другое`)
                    } else if (data.status === "error") {

                        clearInterval(MjInterval)
                        notify('Во время генерации произошла ошибка. Попробуйте ещё раз, если ошибка повторилась, обратитесь в тех. Поддержку')
                    }
                    dispatch(setNewStatus(`${data.status}`))
                })
        }, 3000)
    }






    return (
        <div>
            <div Name="chat_code_chatgpt">
                {midjData.type === "image" &&
                        midjData.messages[0] &&
                            <div className="midjourney_chat">
                                <img className="chat_code_img" src={midjData.messages[midjData.messages.length-1].result} alt=""/>
                                <div className="midjourney_chat_right">

                                    <form className="midjourney_chat_form">
                                        <div className="midjourney_chat_label">
                                            Выберите понравившиеся <br/> изображение:
                                        </div>
                                        <div className="midjourney_chat_box">
                                            {/* <input type="text" name="a1" id="a_one" value="A1" />
                                <input type="text" name="a2" id="a_two" value="A2" />
                                <input type="text" name="a3" id="a_three" value="A3" />
                                <input type="text" name="a4" id="a_four" value="A4" /> */}
                                            <div className='midjourney_chat_item' onClick={()=> getImage('variation-1')}>V1</div>
                                            <div className='midjourney_chat_item' onClick={()=> getImage('variation-2')}>V2</div>
                                            <div className='midjourney_chat_item' onClick={()=> getImage('variation-3')}>V3</div>
                                            <div className='midjourney_chat_item' onClick={()=> getImage('variation-4')}>V4</div>
                                            <div className='midjourney_chat_item' onClick={()=> getImage('upsample-1')}>U1</div>
                                            <div className='midjourney_chat_item' onClick={()=> getImage('upsample-2')}>U2</div>
                                            <div className='midjourney_chat_item' onClick={()=> getImage('upsample-3')}>U3</div>
                                            <div className='midjourney_chat_item' onClick={()=> getImage('upsample-4')}>U4</div>
                                        </div>
                                        <a href={midjData.messages[midjData.messages.length-1].result} download={true} target="_blank" className="midjourney_chat_btn" style={{marginTop: 10}}>Скачать</a>
                                    </form>
                                </div>

                            </div>

                }

            </div>
        </div>
    )
}

export default MessageMidjorney