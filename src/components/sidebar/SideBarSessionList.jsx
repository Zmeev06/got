import React from 'react';
import SideBarSession from './SideBarSession';

const SideBarSessionList = ({ sessions, createChat }) => {
  console.log(sessions);

  return (
    <ul className="nav-second-level">
      <li onClick={() => createChat()}>
        <a href="#">
          <span className="plus_sp">+ </span> Новый чат
        </a>
      </li>
      {sessions.map((session) => (
        <SideBarSession key={session.pk} session={session} />
      ))}
    </ul>
  );
};

export default SideBarSessionList;
