import { baseQuery } from './settings';
import { buildCreateApi, coreModule, reactHooksModule } from '@reduxjs/toolkit/query/react';

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({
        url: `api/v1/sessions/`,
        method: 'GET'
      })
    }),
    deleteFolder: builder.mutation({
      query: ({ folder }) => ({
        url: `api/v1/folder/${folder}`,
        method: 'DELETE'
      })
    }),
    deleteChat: builder.mutation({
      query: ({ chat }) => ({
        url: `api/v1/chatsession/${chat}`,
        method: 'DELETE'
      })
    }),
    createChat: builder.mutation({
      query: ({ folder }) => ({
        url: 'api/v1/chatsession/',
        method: 'POST',
        body: {
          folder,
          ai_model: 'gpt-3.5-turbo'
        }
      })
    }),
    editFolder: builder.mutation({
      query: ({ folder, name }) => ({
        url: `api/v1/folder/${folder}/`,
        method: 'PATCH',
        body: {
          name
        }
      })
    }),
    editChat: builder.mutation({
      query: ({ chat, name }) => ({
        url: `api/v1/chatsession/${chat}/`,
        method: 'PATCH',
        body: {
          name
        }
      })
    })
  })
});
