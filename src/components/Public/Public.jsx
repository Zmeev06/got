import React from 'react'
import PublicTop from '../PublicTop/PublicTop'
import PublicItem from '../PublicItem/PublicItem'

const Public = () => {
    const itemData = {
        title: 'Быстрые действия',
        content: {
            title: 'Напиши формулу для Excel либо Google таблиц',
            text: 'Напишите любую формулу для Microsoft Excel или Google таблиц по вашему запросу',
        },
    };
    return (
        <div>
            <PublicTop />
            <div className="big_collection_boxs ">
                <PublicItem title={itemData.title} content={itemData.content} />
                <PublicItem title={itemData.title} content={itemData.content} />
                <PublicItem title={itemData.title} content={itemData.content} />
                <PublicItem title={itemData.title} content={itemData.content} />
                <PublicItem title={itemData.title} content={itemData.content} />
                <PublicItem title={itemData.title} content={itemData.content} />
                <PublicItem title={itemData.title} content={itemData.content} />
                <PublicItem title={itemData.title} content={itemData.content} />
                <PublicItem title={itemData.title} content={itemData.content} />
            </div>
        </div>
    )
}

export default Public