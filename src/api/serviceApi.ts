import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const serviceApi = createApi({

    reducerPath: 'service',

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

    tagTypes: ["Services"],

    endpoints: (builder) => ({

        getAllServices: builder.query({
            query: () => '/service',
            providesTags: ["Services"],
        }),

        getServiceByID: builder.query({
            query: (id) => `/service/${ id }`,
            extraOptions:{maxRetries:2},
            providesTags: ["Services"],
        }),

        addNewService: builder.mutation({
          query: (newService) =>({
            url: '/service',
            method: 'POST',
            body: newService,
          }),
          invalidatesTags: ["Services"],
          extraOptions: {maxRetries:0}
        }),

      updateService: builder.mutation({
        query(data){
          const { id, value } = data

          return {
            url: `/service/${id}`,
            method: 'PUT',
            body: value,
          }
        },
        invalidatesTags: ["Services"],
        extraOptions: {maxRetries:2}
      }),

      deleteService: builder.mutation({
        query(data){
          const { id, values } = data

          return {
            url: `/service/remove/${id}`,
            method: 'PUT',
            body: values,
          }
        },
        invalidatesTags: ["Services"],
        extraOptions: {maxRetries:2}
      })
    })

})

export const { 
  useGetAllServicesQuery,
  useGetServiceByIDQuery,
  useAddNewServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
 } = serviceApi;