import { baseQuery } from './settings';
import { buildCreateApi, coreModule, reactHooksModule } from '@reduxjs/toolkit/query/react';

const createApi = buildCreateApi(coreModule(), reactHooksModule({ unstable__sideEffectsInRender: true }));

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    authUser: builder.query({
      query: () => ({
        url: 'auth/me/',
        method: 'GET',
      }),
    }),
  }),
});
