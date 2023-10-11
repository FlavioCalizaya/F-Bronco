import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const providerApi: any = createApi({

    reducerPath: 'provider',

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

    keepUnusedDataFor: 60,    
    refetchOnMountOrArgChange: true,  
    refetchOnFocus: true,       
    refetchOnReconnect:true,

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
        invalidatesTags: ["Providers"],
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
  useLazyGetProviderByIDQuery
 } = providerApi;