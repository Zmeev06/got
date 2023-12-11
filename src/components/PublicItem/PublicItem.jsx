import React from 'react'
import PublicItemTop from '../PublicItemTop/PublicItemTop'
import PublicItemBottom from '../PublicItemBottom/PublicItemBottom'

const PublicItem = ({ title, content }) => {
    return (
        <div className="big_collection_item">
            <PublicItemTop title={title} />
            <PublicItemBottom content={content} />
        </div>
    )
}

export default PublicItem