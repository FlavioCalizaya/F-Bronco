import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { providerApi } from '../api/providerApi';
import { productApi } from 'src/api/Product';
import { saleApi } from 'src/api/Sale';
import { clientApi } from '../api/clientApi'; 
import { purchaseApi } from 'src/api/purchaseApi';
import { inventoryApi } from 'src/api/inventoryApi';

export const store:any = configureStore({
  reducer: {
    [providerApi.reducerPath]: providerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [saleApi.reducerPath]: saleApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat( 
    [ providerApi.middleware, 
    productApi.middleware,
    clientApi.middleware,
    saleApi.middleware,
    purchaseApi.middleware,
    inventoryApi.middleware,] )
})


setupListeners(store.dispatch)
