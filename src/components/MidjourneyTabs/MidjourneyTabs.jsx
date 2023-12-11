import React, { useState } from 'react'
import TabButton from '../UI/tabButton/TabButton'
import RateSettings from '../RateSettings/RateSettings'
import { Settings } from 'react-feather';
import MidjourneyPoint from '../MidjourneyPoint/MidjourneyPoint';

const MidjourneyTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className='flex'>
            <ul className="midjourney_ul midjourney_ul_tab_header  midj desc">
                <TabButton className="active" id={0} isActive={activeTab === 0} setActiveTab={setActiveTab} DataFeather={null} href="#">Введение</TabButton>
                <TabButton id={1} isActive={activeTab === 1} setActiveTab={setActiveTab} DataFeather={null} href="#">Быстрый старт</TabButton>
                <TabButton id={2} isActive={activeTab === 2} setActiveTab={setActiveTab} DataFeather={null} href="#">Библиотеки</TabButton>
                <TabButton id={3} isActive={activeTab === 3} setActiveTab={setActiveTab} DataFeather={null} href="#">Модели</TabButton>
                <TabButton id={4} isActive={activeTab === 4} setActiveTab={setActiveTab} DataFeather={null} href="#">Устаревшие</TabButton>
                <TabButton id={5} isActive={activeTab === 5} setActiveTab={setActiveTab} DataFeather={null} href="#">Учебники</TabButton>
                <TabButton id={6} isActive={activeTab === 6} setActiveTab={setActiveTab} DataFeather={null} href="#">Политики</TabButton>
                {/* <li><a href="#generator_block_one" className="active">Введение</a></li>
                <li><a href="#generator_block_two">Быстрый старт</a></li>
                <li><a href="#generator_block_three">Библиотеки</a></li>
                <li><a href="#generator_block_four">Модели</a></li>
                <li><a href="#generator_block_five">Устаревшие</a></li>
                <li><a href="#generator_block_six">Учебники</a></li>
                <li><a href="#generator_block_seven">Политики</a></li> */}
            </ul>
            {activeTab === 0 && <MidjourneyPoint />}
            {activeTab === 1 && <MidjourneyPoint />}
            {activeTab === 2 && <MidjourneyPoint />}
            {activeTab === 3 && <MidjourneyPoint />}
            {activeTab === 4 && <MidjourneyPoint />}
            {activeTab === 5 && <MidjourneyPoint />}
            {activeTab === 6 && <MidjourneyPoint />}
            {/* {activeTab === 1 && <Rate />}
            {activeTab === 2 && <RateApi />} */}
        </div>
    )
}

export default MidjourneyTabs