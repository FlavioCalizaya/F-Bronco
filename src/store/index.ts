import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';


import { productApi } from 'src/api/Product';
import { providerApi } from '../api/providerApi';
import {clientApi} from '../api/clientApi';
import {serviceApi} from '../api/serviceApi';



export const store:any = configureStore({
  reducer: {
    [providerApi.reducerPath]: providerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat( [ providerApi.middleware, productApi.middleware,clientApi.middleware, serviceApi.middleware] )
})


setupListeners(store.dispatch)  
