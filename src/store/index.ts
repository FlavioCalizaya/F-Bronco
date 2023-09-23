import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { providerApi } from '../api/providerApi';

export const store:any = configureStore({
  reducer: {
    [providerApi.reducerPath]: providerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat( [
    providerApi.middleware,] )
})

setupListeners(store.dispatch)