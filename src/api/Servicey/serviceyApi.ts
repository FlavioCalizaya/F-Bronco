import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const serviceyApi:any = createApi({

    reducerPath: 'serviceys',

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

    tagTypes: ["Servicey"],

    endpoints: (builder) => ({

      getAllServicey: builder.query({
        query: () => '/servicess',
        providesTags: ["Servicey"],
    }),

    getServiceyByID: builder.query({
        query: (id) => `/servicess/${ id }`,
        extraOptions:{maxRetries:2},
        providesTags: ["Servicey"],
    }),
        addNewServicey: builder.mutation({
          query: (newServicey) =>({
            url: '/servicess',
            
            method: 'POST',
            body: newServicey,
          }),
          invalidatesTags: ["Servicey"],
          extraOptions: {maxRetries:0}
        }),

      updateServicey: builder.mutation({
        query(data){
          const { id, values } = data

          return {
            url: `/servicess/${id}`,
            method: 'PUT',
            body: values,
          }
        },
        invalidatesTags: ["Servicey"],
        extraOptions: {maxRetries:2}
      }),

      deleteServicey: builder.mutation({
        query: (id) => ({
          url: `/servicess/${id}`,
          method: 'DELETE',
        }),
        extraOptions: {maxRetries:2},
      })
    })

})

export const { 
  useGetAllServiceyQuery,
  useGetServiceyByIDQuery,
  useAddNewServiceyMutation,
  useUpdateServiceyMutation,
  useDeleteServiceyMutation,
  useLazyGetServiceyByIDQuery
 } = serviceyApi;