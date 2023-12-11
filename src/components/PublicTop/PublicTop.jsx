import React, { useState } from 'react';
import { Cheveron } from 'react-feather';

const PublicTop = () => {
    const [selectedCategory, setSelectedCategory] = useState('Всё подряд');
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setIsMenuVisible(false);
    };

    const handleToggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };
    return (
        <div>
            <div className="public_body_top">
                <li className={`dropdown d-none d-xl-block ${isMenuVisible ? 'show' : ''}`}>
                    <a
                        className="categories-pop nav-link dropdown-toggle waves-effect waves-light"
                        data-bs-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="false"
                        aria-expanded="true"
                        onClick={handleToggleMenu}
                    >
                        Категория: {selectedCategory}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-down"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                    </a>
                    <div className={`dropdown-menu ${isMenuVisible ? 'show' : ''}`} data-popper-placement="bottom-start">
                        <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                            onClick={() => handleCategoryClick('Категория №1')}
                        >
                            <span>Категория №1</span>
                        </a>
                        <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                            onClick={() => handleCategoryClick('Категория №2')}
                        >
                            <span>Категория №2</span>
                        </a>
                        <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                            onClick={() => handleCategoryClick('Категория №3')}
                        >
                            <span>Категория №3</span>
                        </a>
                    </div>
                </li>
                <form className="app-search">
                    <div className="app-search-box dropdown">
                        <div className="input-group">
                            <a href="public_not_found.html"
                                className="d-flex btn input-group-text public_btn_search">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </a>
                            <input type="search" className="public_btn_search" placeholder="Найти шаблон"
                                id="public_not_found" />
                        </div>
                        <div className="dropdown-menu dropdown-lg" id="search-dropdown">
                            <div className="dropdown-header noti-title">
                                <h5 className="text-overflow mb-2">Found 22 results</h5>
                            </div>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                <span>Analytics Report</span>
                            </a>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                <span>How can I help you?</span>
                            </a>
                            <a href="javascript:void(0);" className="dropdown-item notify-item">
                                <span>User profile settings</span>
                            </a>
                            <div className="dropdown-header noti-title">
                                <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div >
    )
}

export default PublicTop