import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const maintenanceApi:any = createApi({

    reducerPath: 'maintenances',

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

    keepUnusedDataFor: 60,    
    refetchOnMountOrArgChange: true,  
    refetchOnFocus: true,       
    refetchOnReconnect:true,

    tagTypes: ["Servicey"],

    endpoints: (builder) => ({

      getAllMaintenance: builder.query({
          query: (idUser) => `/servicess/user/${ idUser }`,
          providesTags: ["Servicey"],
      }),


      getMaintenanceByID: builder.query({
        query: (id) => `/servicess/${ id }`,
        extraOptions:{maxRetries:2},
        providesTags: ["Servicey"],
      }),

      updateMaintenance: builder.mutation({
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
      })
    })

})

export const { 
  useGetAllMaintenanceQuery,
  useGetMaintenanceByIDQuery,
  useUpdateMaintenanceMutation
} = maintenanceApi;