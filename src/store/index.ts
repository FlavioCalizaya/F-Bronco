import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { providerApi } from '../api/providerApi';
import { productApi } from 'src/api/Product';
import { saleApi } from 'src/api/Sale';
import { clientApi } from '../api/clientApi'; 
import { serviceyApi } from '../api/Servicey/serviceyApi'; 

export const store:any = configureStore({
  reducer: {
    [providerApi.reducerPath]: providerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [serviceyApi.reducerPath]: serviceyApi.reducer,
    [saleApi.reducerPath]: saleApi.reducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat( [ providerApi.middleware, productApi.middleware,clientApi.middleware,saleApi.middleware,serviceyApi.middleware] )
})


setupListeners(store.dispatch)
