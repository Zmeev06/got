import React from 'react'
import PublicTop from '../PublicTop/PublicTop'

const PublicPersonal = () => {
    return (
        <div><PublicTop />
            <div className="public__body_content">
                <span className="public__body-text">Вы пока не добавили ни одного личного шаблона.</span>
                <a href="#public_create" className="public_create-link">
                    <button className="public__body-btn">Создать шаблон</button>
                </a>
            </div>
        </div>
    )
}

export default PublicPersonal