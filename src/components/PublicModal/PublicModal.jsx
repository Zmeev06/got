import React, { useState } from 'react'
import Public from '../../components/Public/Public';
import PublicPersonal from '../../components/PublicPersonal/PublicPersonal';
import PublicElected from '../../components/PublicElected/PublicElected';
import PublicCreate from '../../components/PublicCreate/PublicCreate';
import PublicClose from '../../components/PublicClose/PublicClose';

import TabButton from '../../components/UI/tabButton/TabButton';
import { Users, Heart, Lock, Folder, X } from 'react-feather';

const PublicModal = ({ setModalClick }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div>
            <div className="public__modal ">
                <div className="content container-back">
                    <div className="public_tab rate_tab pulic_tab container-back ">
                        <ul>
                            <TabButton id={0} isActive={activeTab === 0} setActiveTab={setActiveTab} DataFeather={Users} href="#">Публичные</TabButton>
                            <TabButton id={1} isActive={activeTab === 1} setActiveTab={setActiveTab} DataFeather={Lock} href="#">Личные</TabButton>
                            <TabButton id={2} isActive={activeTab === 2} setActiveTab={setActiveTab} DataFeather={Heart} href="#">Избранные</TabButton>
                            <TabButton id={3} isActive={activeTab === 3} setActiveTab={setActiveTab} DataFeather={Folder} href="#">Создать</TabButton>
                            <div onClick={() => setModalClick()} className=""><TabButton id={4} isActive={activeTab === 4} setActiveTab={setActiveTab} DataFeather={X} href="#">Закрыть</TabButton></div>

                        </ul>
                    </div>
                    {activeTab === 0 && <Public />}
                    {activeTab === 1 && <PublicPersonal />}
                    {activeTab === 2 && <PublicElected />}
                    {activeTab === 3 && <PublicCreate />}
                    {activeTab === 4 && <PublicClose />}
                </div>
            </div>
        </div>
    )
}

export default PublicModal