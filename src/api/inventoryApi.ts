import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const inventoryApi: any = createApi({

    reducerPath: 'inventory',

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

    tagTypes: ["Inventories"],

    endpoints: (builder) => ({

        getAllInventories: builder.query({
            query: () => '/inventory',
            providesTags: ["Inventories"],
        }),

        getInventoryByID: builder.query({
          
            query: (id) => `/inventory/${ id }`,
            extraOptions:{maxRetries:2},
            providesTags: ["Inventories"],
        }),

        addNewInventory: builder.mutation({
          query: (newInventory) =>({
            url: '/inventory',
            method: 'POST',
            body: newInventory,
          }),
          invalidatesTags: ["Inventories"],
          extraOptions: {maxRetries:0}
        }),

      updateInventory: builder.mutation({
        query(data){
          const { id, values } = data

          return {
            url: `/inventory/${id}`,
            method: 'PUT',
            body: values,
          }
        },
        invalidatesTags: ["Inventories"],
        extraOptions: {maxRetries:2}
      }),

      deleteInventory: builder.mutation({
        query: (id) => ({
          url: `/inventory/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ["Inventories"],
        extraOptions: {maxRetries:2},
      })
    })

})

export const { 
  useGetAllInventoriesQuery,
  useGetInventoryByIDQuery,
  useAddNewInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
  useLazyGetInventoryByIDQuery
 } = inventoryApi;