import React from 'react'

const PublicItemBottom = ({ content }) => {
    return (
        <div>
            <div className="big_collection_item_bottom">
                <span>{content.title}</span>
                <p>{content.text}</p>
            </div>
        </div>
    )
}

export default PublicItemBottom