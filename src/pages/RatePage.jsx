import React, { useEffect, useState } from 'react';
import Rate from '../components/Rate/Rate';
import RateApi from '../components/RateApi/RateApi';
import RateSettings from '../components/RateSettings/RateSettings';
import TabButton from '../components/UI/tabButton/TabButton';
import { Settings, Star, Move } from 'react-feather';
import { useLocation } from 'react-router-dom';


const RatePage = () => {
    const [activeTab, setActiveTab] = useState(0);

    const location = useLocation();






    return (<>
        {location?.state?.plan ?

            <div className="content-page ">
                <div className="content">
                    <div className="public_tab rate_tab container-back">
                        <ul>
                            <TabButton id={1} isActive={activeTab === 1} setActiveTab={setActiveTab} DataFeather={Settings} href="#">Настройки</TabButton>
                            <TabButton id={0} isActive={activeTab === 0} setActiveTab={setActiveTab} DataFeather={Star} href="#">Тарифы</TabButton>
                            <TabButton id={2} isActive={activeTab === 2} setActiveTab={setActiveTab} DataFeather={Move} href="#">Работа с API</TabButton>
                        </ul>
                    </div>

                    {activeTab === 0 && <Rate />}
                    {activeTab === 1 && <RateSettings />}
                    {activeTab === 2 && <RateApi />}
                </div>
            </div>

            : location?.state?.work ?
                <div className="content-page ">
                    <div className="content">
                        <div className="public_tab rate_tab container-back">
                            <ul>
                                <TabButton id={2} isActive={activeTab === 2} setActiveTab={setActiveTab} DataFeather={Settings} href="#">Настройки</TabButton>
                                <TabButton id={1} isActive={activeTab === 1} setActiveTab={setActiveTab} DataFeather={Star} href="#">Тарифы</TabButton>
                                <TabButton id={0} isActive={activeTab === 0} setActiveTab={setActiveTab} DataFeather={Move} href="#">Работа с API</TabButton>
                            </ul>
                        </div>

                        {activeTab === 0 && <RateApi />}
                        {activeTab === 1 && <RateSettings />}
                        {activeTab === 2 && <Rate />}
                    </div>
                </div>
                :
                <div className="content-page ">
                    <div className="content">
                        <div className="public_tab rate_tab container-back">
                            <ul>
                                <TabButton id={0} isActive={activeTab === 0} setActiveTab={setActiveTab} DataFeather={Settings} href="#">Настройки</TabButton>
                                <TabButton id={1} isActive={activeTab === 1} setActiveTab={setActiveTab} DataFeather={Star} href="#">Тарифы</TabButton>
                                <TabButton id={2} isActive={activeTab === 2} setActiveTab={setActiveTab} DataFeather={Move} href="#">Работа с API</TabButton>
                            </ul>
                        </div>

                        {activeTab === 0 && <RateSettings />}
                        {activeTab === 1 && <Rate />}
                        {activeTab === 2 && <RateApi />}
                    </div>
                </div>
        }
    </>
    );
}

export default RatePage;
