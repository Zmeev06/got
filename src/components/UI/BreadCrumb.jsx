import React from 'react'
import Arrow from '../../images/icons/arrow.png'
function BreadCrumb() {
    return (
        <section className="breadcrumb what">
            <ul className="axil-breadcrumb">
                <li className="axil-breadcrumb-item"><a href="#">Все коллекции</a></li>
                <li className="separator"><img src={Arrow} alt="" /></li>
                <li className="axil-breadcrumb-item"><a href="#">ЧатGPT</a></li>
                <li className="separator"><img src={Arrow} alt="" /></li>
                <li className="axil-breadcrumb-item active" aria-current="page">Что такое ChatGPT?</li>
            </ul>
        </section>
    )
}

export default BreadCrumb