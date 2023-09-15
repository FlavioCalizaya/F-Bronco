import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const providerApi = createApi({

    reducerPath: 'provider',

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

    tagTypes: ["Providers"],

    endpoints: (builder) => ({

        getAllProviders: builder.query({
            query: () => '/providers',
            providesTags: ["Providers"],
        }),

        getProviderByID: builder.query({
            query: (id) => `/providers/${ id }`,
            extraOptions:{maxRetries:2},
            providesTags: ["Providers"],
        }),

        addNewProvider: builder.mutation({
          query: (newProvider) =>({
            url: '/providers',
            method: 'POST',
            body: newProvider,
          }),
          invalidatesTags: ["Providers"],
          extraOptions: {maxRetries:0}
        }),

      updateProvider: builder.mutation({
        query(data){
          const { id, values } = data

          return {
            url: `/providers/${id}`,
            method: 'PUT',
            body: values,
          }
        },
        invalidatesTags: ["Providers"],
        extraOptions: {maxRetries:2}
      }),

      deleteProvider: builder.mutation({
        query: (id) => ({
          url: `/providers/${id}`,
          method: 'DELETE',
        }),
        extraOptions: {maxRetries:2},
      })
    })

})

export const { 
  useGetAllProvidersQuery,
  useGetProviderByIDQuery,
  useAddNewProviderMutation,
  useUpdateProviderMutation,
  useDeleteProviderMutation,
 } = providerApi;