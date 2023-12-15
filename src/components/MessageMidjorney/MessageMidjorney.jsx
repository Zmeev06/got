import React from 'react'
import MidImg from '../../images/midjorney/bears.png'

const MessageMidjorney = (midjData) => {
    console.log(midjData.midjData);
    return (

        <div>
            <div class="chat_code_chatgpt">
                {midjData.midjData != null &&

                    <div class="midjourney_chat">
                        <img class="chat_code_img" src={midjData.midjData} alt="" />
                        <div class="midjourney_chat_right">

                            <form class="midjourney_chat_form">
                                <div class="midjourney_chat_label">
                                    Выберите понравившиеся <br /> изображение:
                                </div>
                                <div class="midjourney_chat_box">
                                    {/* <input type="text" name="a1" id="a_one" value="A1" />
                                <input type="text" name="a2" id="a_two" value="A2" />
                                <input type="text" name="a3" id="a_three" value="A3" />
                                <input type="text" name="a4" id="a_four" value="A4" /> */}
                                    <a href="#" class="midjourney_chat_item">V1</a>
                                    <a href="#" class="midjourney_chat_item">V2</a>
                                    <a href="#" class="midjourney_chat_item">V3</a>
                                    <a href="#" class="midjourney_chat_item">V4</a>
                                    <a href="#" class="midjourney_chat_item">U5</a>
                                    <a href="#" class="midjourney_chat_item">U6</a>
                                    <a href="#" class="midjourney_chat_item">U7</a>
                                    <a href="#" class="midjourney_chat_item">U8</a>
                                </div>
                                <button class="midjourney_chat_btn">Выбрать</button>
                            </form>
                        </div>

                    </div>
                }

            </div>
        </div>
    )
}

export default MessageMidjorney