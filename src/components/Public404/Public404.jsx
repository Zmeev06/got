import React from 'react'
import NotFound from '../../images/icons/(o_o).png'

const Public404 = () => {
    return (
        <div>
            <div className="public_body">
                <img src={NotFound} alt="" />
                <p>Промт “Секрет успеха” не найдено</p>
                <a className="reset_search" href="#">Сбросить поиск</a>
            </div>
        </div>
    )
}

export default Public404