import React, { useEffect } from 'react';
import './styles/bootstrap.min.css';
import './styles/app.min.css';
import './styles/icons.min.css';
import './styles/swiper-bundle.min.css';
import './styles/style.css';
import WhatPage from './pages/WhatPage';
import RatePage from './pages/RatePage';
import MidjourneyPage from './pages/MidjourneyPage';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NewChatPage } from './pages/NewChatPage';
import { Layout } from './components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { setTg, setUserAvatar } from './redux/slices/userSlice';
import { userApi } from './redux/services/userService';

function App() {
  const dispatch = useDispatch();
  const { data: auth, isSuccess, error } = userApi.useAuthUserQuery();
  
  useEffect(() => {
    if(isSuccess) {
      dispatch(setUserAvatar(auth.avatar));
      dispatch(setTg(auth.telegram_associated));
    } else if (error) {
      if(error.status === 401) {
        window.location.href = 'https://ziongpt.ai'
      }
    }
  }, [auth]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={<Layout auth={auth} getCookie={getCookie} />}>
          <Route path="/chat" element={<NewChatPage />} />
          <Route path="/chat/:chatId" Component={MidjourneyPage} />
          <Route path="/faq" element={<WhatPage />} />
          <Route path="/settings" element={<RatePage auth={auth} />} />
          <Route path="*" element={<NewChatPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
