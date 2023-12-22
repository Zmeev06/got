import React from 'react';
import './tokenModal.css';
import krest from '../../images/token__modal.png'

export default function TokenModal() {
  return (
    <div className='tokenModal'>
        <img src={krest} alt="" className="tokenModal-img" />
        <span className="tokenModal-text">Ваши бесплатные токены закончились, обновите вашу подписку до уровня PRO или подождите 24 часа и сможете снова воспользоваться бесплатно.</span>
    </div>
  )
}
