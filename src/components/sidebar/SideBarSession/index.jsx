import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './style.module.scss';

const SideBarSession = ({ session }) => {
  const chatId = useParams();

  return (
    <>
      <li>
        <Link
          to={`/chat/${session?.pk}`}
          className={`${styles.link} ${chatId.chatId === session.pk ? 'active' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-message-square">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          {session?.name}
        </Link>
      </li>
    </>
  );
};

export default SideBarSession;
