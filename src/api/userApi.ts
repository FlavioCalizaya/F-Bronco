import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({

    reducerPath: 'Users',

    baseQuery: retry(fetchBaseQuery({ 
      baseUrl: 'http://localhost:8080/api/v1',
      prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('sessionJWTToken')
        if (token) {
          headers.set('x-access-token', `${token}`)
        }

        return headers
      },},
    ),
    {maxRetries:1}),

    keepUnusedDataFor: 60,    //Tiempo que se matendra la data en el cache, time in sec
    refetchOnMountOrArgChange: true,  // Revalida lo datos en cada cambio
    refetchOnFocus: true,       // Cuando pone el foco en la informacion revalida
    refetchOnReconnect:true,    // Revalida los datos cuando hay Red

    tagTypes: ["Users"],

    endpoints: (builder) => ({

        getAllUsers: builder.query({
            query: () => '/users',
            providesTags: ["Users"],
        }),

        getUserByID: builder.query({
            query: (id) => `/users/${ id }`,
            extraOptions:{maxRetries:2},
            providesTags: ["Users"],
        }),

        addNewUser: builder.mutation({
          query: (newProduct) =>({
            url: '/users',
            method: 'POST',
            body: newProduct,
          }),
          invalidatesTags: ["Users"],
          extraOptions: {maxRetries:0}
        }),

      updateUser: builder.mutation({
        query(data){
          const { id, value } = data

          return {
            url: `/users/${id}`,
            method: 'PUT',
            body: value,
          }
        },
        invalidatesTags: ["Users"],
        extraOptions: {maxRetries:2}
      }),

      deleteUser: builder.mutation({
        query(data){
          const { id, values } = data

          return {
            url: `/users/remove/${id}`,
            method: 'PUT',
            body: values,
          }
        },
        invalidatesTags: ["Users"],
        extraOptions: {maxRetries:2}
      })
    })

})

export const { 
  useGetAllUsersQuery,
  useGetUserByIDQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
 } = userApi;