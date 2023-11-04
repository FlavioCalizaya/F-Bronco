import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({

    reducerPath: 'auth',

    baseQuery: retry(fetchBaseQuery({ 
      baseUrl: 'http://localhost:8080/api/v1',
    })),

    keepUnusedDataFor: 60,   
    tagTypes: ["Auth"],

    endpoints: (builder) => ({
      login: builder.mutation({
          query: (data) => ({
            url: '/users/login',
            method: 'POST',
            body: data
          }),
          extraOptions: { maxRetries: 0 },
      }),
    })

})

export const { useLoginMutation } = authApi;
