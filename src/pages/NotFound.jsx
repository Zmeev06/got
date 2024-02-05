import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import desctop404 from '../images/what/404_desctop.png';
import { ReactComponent as Arrow } from '../images/what/arrow.svg';

const NotFound = () => {
  return (
    <div className="not-found ">
      <div className="not-found-container">
        <div className="not-found-img">
          <img src={desctop404} alt="" />
        </div>
        <div className="not-found-right-side">
          <p className="not-found-text">
            Ууууупс...
            <br />
            Такой страницы нет
          </p>
          <Link style={{ width: 'fit-content' }} to={'/'}>
            <button className="not-found-btn">
              На Главную <Arrow />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
