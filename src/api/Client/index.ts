import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const clientApi = createApi({

    reducerPath: 'client',

    baseQuery: retry(fetchBaseQuery({ 
      baseUrl: 'http://localhost:8080/api/v1',
      prepareHeaders: (headers) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = sessionStorage.getItem('sessionJWTToken')
        if (token) {
          headers.set('x-access-token', `${token}`)
        }

        return headers
      },},
    ),
    {maxRetries:1}),

    keepUnusedDataFor: 60,    //Tiempo que se matendra la data en el cache
    refetchOnMountOrArgChange: true,  // Revalida lo datos en cada cambio
    refetchOnFocus: true,       // Cuando pone el foco en la informacion revalida
    refetchOnReconnect:true,    // Revalida los datos cuando hay Red

    tagTypes: ["Client"],

    endpoints: (builder) => ({

      getAllClient: builder.query({
        query: () => '/client',
        providesTags: ["Client"],
    }),

    getClientByID: builder.query({
        query: (id) => `/client/${ id }`,
        extraOptions:{maxRetries:2},
        providesTags: ["Client"],
    }),
        addNewClient: builder.mutation({
          query: (newClient) =>({
            url: '/client',
            method: 'POST',
            body: newClient,
          }),
          invalidatesTags: ["Client"],
          extraOptions: {maxRetries:0}
        }),

      updateClient: builder.mutation({
        query(data){
          const { id, values } = data

          return {
            url: `/client/${id}`,
            method: 'PUT',
            body: values,
          }
        },
        invalidatesTags: ["Client"],
        extraOptions: {maxRetries:2}
      }),

      deleteClient: builder.mutation({
        query: (id) => ({
          url: `/client/${id}`,
          method: 'DELETE',
        }),
        extraOptions: {maxRetries:2},
      })
    })

})

export const { 
  useGetAllClientQuery,
  useGetClientByIDQuery,
  useAddNewClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
 } = clientApi;