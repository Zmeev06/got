import React from 'react';
import { Link } from 'react-router-dom';

const SideBarBottomLinks = () => {
    return (
        <ul>
            <li className="line_sp">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span> Новости </span>
                </a>
            </li>

            <li>
                <Link to="/settings" state={{
                    plan: true,
                }} >
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span> Тарифы </span>
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/settings" state={{
                    work: true,
                }} >
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-move">
                            <polyline points="5 9 2 12 5 15"></polyline>
                            <polyline points="9 5 12 2 15 5"></polyline>
                            <polyline points="15 19 12 22 9 19"></polyline>
                            <polyline points="19 9 22 12 19 15"></polyline>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <line x1="12" y1="2" x2="12" y2="22"></line>
                        </svg>
                        <span> Работа с API </span>
                    </div>
                </Link>
            </li>
        </ul>
    );
};

export default SideBarBottomLinks;