import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import authReducer from '@/entities/user/model/authSlice';

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        userLogin: authReducer, // Keep the key as userLogin for backward compatibility if needed in some components
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
