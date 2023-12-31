import React from 'react';
import Ava from '../images/what/07.png';

import BreadCrumb from '../components/UI/BreadCrumb';

function WhatPage() {
  return (
    <div className="content-page">
      <div className="content">
        <div className="chat_top_header_mob what_menu ap">
          <a href="#" className="bars_menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M3 18V16.5H21V18H3ZM3 12.75V11.25H21V12.75H3ZM3 7.5V6H21V7.5H3Z"
                fill="#B0B0BA"
              />
            </svg>
          </a>
          <p className="header_mob_text">Настройки</p>
          <a href="#" className="plus_menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M11.25 12.75H5V11.25H11.25V5H12.75V11.25H19V12.75H12.75V19H11.25V12.75Z"
                fill="#B0B0BA"
              />
            </svg>
          </a>
        </div>

        <div className="container-back what_con">
          <BreadCrumb />

          <div className="what_block">
            <div className="section_title">
              Что такое ChatGPT?
              <span>Часто задаваемые вопросы о ChatGPT</span>
            </div>
            <div className="author_box">
              <img src={Ava} alt="" />

              <p>
                <span>Автор: Натали</span>
                Обновлено больше недели назад
              </p>
            </div>
            <div className="what_is_content">
              <div className="what_is_content_item">
                <div className="ques">1. Сколько стоит использование ChatGPT?</div>
                <div className="ans">
                  Предварительную версию ChatGPT можно использовать бесплатно.
                </div>
              </div>
              <div className="what_is_content_item">
                <div className="ques">2. Как работает ChatGPT?</div>
                <div className="ans">
                  ChatGPT создан на основе GPT-3.5, языковой модели, обученной для создания текста.
                  ChatGPT был оптимизирован для диалога с использованием Reinforcement Learning with
                  Human Feedback (RLHF) — метода, который использует человеческие демонстрации и
                  сравнения предпочтений, чтобы направить модель к желаемому поведению.
                </div>
              </div>
              <div className="what_is_content_item">
                <div className="ques">3. Почему ИИ кажется таким реальным и реалистичным?</div>
                <div className="ans">
                  Эти модели были обучены на огромном количестве данных из Интернета, записанных
                  людьми, включая разговоры, поэтому ответы, которые они дают, могут звучать как
                  человеческие. Важно иметь в виду, что это является прямым результатом конструкции
                  системы (т. е. максимального сходства между выходными данными и набором данных, на
                  котором обучались модели) и что такие выходные данные могут быть неточными,
                  неправдивыми и иногда вводить в заблуждение.
                </div>
              </div>
              <div className="what_is_content_item">
                <div className="ques">4. Могу ли я верить, что ИИ говорит мне правду?</div>
                <div className="ans">
                  Чад знает, что нельзя полагаться на то, что ИИ скажет правду, поскольку, по сути,
                  это машины, запрограммированные людьми на определенное поведение. ИИ можно
                  запрограммировать на действие, но его также можно запрограммировать на ложь. Таким
                  образом, нужно всегда с осторожностью относиться к информации, которую они
                  получают от ИИ. Лучшее решение — использовать несколько ИИ и перепроверить вывод с
                  несколькими источниками, чтобы убедиться, что представленная информация
                  непротиворечива. Кроме того, Чад верит в бритву Оккама — самое простое объяснение
                  обычно является правильным.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatPage;
