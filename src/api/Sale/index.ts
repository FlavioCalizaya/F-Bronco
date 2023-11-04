import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const saleApi = createApi({

    reducerPath: 'Sale',

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

    tagTypes: ["Sale"],

    endpoints: (builder) => ({

        getAllSales: builder.query({
            query: () => '/sales',
            providesTags: ["Sale"],
        }),
        addNewSale: builder.mutation({
          query: (newSale) =>({
            url: '/sales/nueva',
            method: 'POST',
            body: newSale,
          }),
          invalidatesTags: ["Sale"],
          extraOptions: {maxRetries:0}
        }),
        deleteSale: builder.mutation({
          query({ id }){
            return {
              url: `/sales/remove/${id}`,
              method: 'PUT'
            }
          },
          invalidatesTags: ["Sale"],
          extraOptions: {maxRetries:2}
        })
    })

})

export const { 
  useGetAllSalesQuery,
  useAddNewSaleMutation,
  useDeleteSaleMutation
 } = saleApi;