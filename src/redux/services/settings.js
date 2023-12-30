import { fetchBaseQuery } from "@reduxjs/toolkit/query";


export const API_URL = 'https://ziongpt.ai/';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const baseQuery = async (args, api) => {
  const query = await fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      const token = getCookie('token')
      if(token) {
        console.log('TOKEN GOOD');
        headers.set("Authorization", `Token ${token}`)
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  })(args, api, {});

  return query;
};