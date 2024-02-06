import { baseQuery } from './settings';
import { buildCreateApi, coreModule, reactHooksModule } from '@reduxjs/toolkit/query/react';

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ id }) => ({
        url: `api/v1/messages/${id}`,
        method: 'GET'
      })
    }),
    deleteFolder: builder.mutation({
      query: ({ folder }) => ({
        url: `api/v1/folder/${folder}`,
        method: 'DELETE'
      })
    })
  }),
  onError: (error) => {
    console.error('Произошла ошибка запроса:', error);
    if (error.status === 401) {
      window.location.href = '/login';
    }
  }
});
