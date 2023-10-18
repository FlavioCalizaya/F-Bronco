import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { providerApi } from '../api/providerApi';
import { purchaseApi } from '../api/purchaseApi';

export const store:any = configureStore({
  reducer: {
    [providerApi.reducerPath]: providerApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat( [
    providerApi.middleware,
    purchaseApi.middleware,] )
})

setupListeners(store.dispatch)