import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const purchaseApi: any = createApi({

    reducerPath: 'purchase',

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

    tagTypes: ["Purchases"],

    endpoints: (builder) => ({

        getAllpurchase: builder.query({
            query: () => '/purchase',
            providesTags: ["Purchases"],
        }),

        getpurchaseByID: builder.query({
          
            query: (id) => `/purchase/${ id }`,
            extraOptions:{maxRetries:2},
            providesTags: ["Purchases"],
        }),

        addNewpurchase: builder.mutation({
          query: (newpurchase) =>({
            url: '/purchase',
            method: 'POST',
            body: newpurchase,
          }),
          invalidatesTags: ["Purchases"],
          extraOptions: {maxRetries:0}
        }),

      updatepurchase: builder.mutation({
        query(data){
          const { id, values } = data

          return {
            url: `/purchase/${id}`,
            method: 'PUT',
            body: values,
          }
        },
        invalidatesTags: ["Purchases"],
        extraOptions: {maxRetries:2}
      }),

      deletepurchase: builder.mutation({
        query: (id) => ({
          url: `/purchase/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ["Purchases"],
        extraOptions: {maxRetries:2},
      })
    })

})

export const { 
  useGetAllpurchaseQuery,
  useGetpurchaseByIDQuery,
  useAddNewpurchaseMutation,
  useUpdatepurchaseMutation,
  useDeletepurchaseMutation,
  useLazyGetpurchaseByIDQuery
 } = purchaseApi;