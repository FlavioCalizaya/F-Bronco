import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { providerApi } from '../api/providerApi';
import { productApi } from 'src/api/Product';
import { saleApi } from 'src/api/Sale';
import { clientApi } from '../api/clientApi'; 
import { serviceyApi } from '../api/Servicey/serviceyApi'; 
import { purchaseApi } from 'src/api/purchaseApi';
import { inventoryApi } from 'src/api/inventoryApi';
import {userApi} from '../api/userApi';
import { maintenanceApi } from 'src/api/Servicey/maintenanceApi';
import { authApi } from 'src/api/authApi';



export const store:any = configureStore({
  reducer: {
    [providerApi.reducerPath]: providerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [serviceyApi.reducerPath]: serviceyApi.reducer,
    [saleApi.reducerPath]: saleApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [maintenanceApi.reducerPath]: maintenanceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat( 
    [ providerApi.middleware, 
    productApi.middleware,
    clientApi.middleware,
    saleApi.middleware,
    purchaseApi.middleware,
    inventoryApi.middleware,
    serviceyApi.middleware,
    userApi.middleware,
    maintenanceApi.middleware,
    authApi.middleware,
    ] )
})


setupListeners(store.dispatch)  
