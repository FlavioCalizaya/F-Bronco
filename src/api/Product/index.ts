import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const productApi = createApi({

    reducerPath: 'product',

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

    tagTypes: ["Product"],

    endpoints: (builder) => ({

        getAllProducts: builder.query({
            query: () => '/products',
            providesTags: ["Product"],
        }),

        getProductByID: builder.query({
            query: (id) => `/products/${ id }`,
            extraOptions:{maxRetries:2},
            providesTags: ["Product"],
        }),
        getProductByName: builder.query({
          query: ( name ) => `/products/names/${ name }`,
          extraOptions:{maxRetries:2},
          providesTags: ["Product"],
      }),

        addNewProduct: builder.mutation({
          query: ( newProduct ) => {
            console.log(newProduct,'new Product');
            return {
              url: '/products',
              method: 'POST',
              body: newProduct
            };
          },
        }),

      updateProduct: builder.mutation({
        query(data){
          const { id, value } = data
          return {
            url: `/products/${id}`,
            method: 'PUT',
            body: value,
          }
        },
        invalidatesTags: ["Product"],
        extraOptions: {maxRetries:2}
      }),

      deleteProduct: builder.mutation({
        query(data){
          const { id, values } = data

          return {
            url: `/products/remove/${id}`,
            method: 'PUT',
            body: values,
          }
        },
        invalidatesTags: ["Product"],
        extraOptions: {maxRetries:2}
      })
    })

})

export const { 
  useGetAllProductsQuery,
  useGetProductByIDQuery,
  useGetProductByNameQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
 } = productApi;