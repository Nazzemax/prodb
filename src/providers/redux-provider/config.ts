import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/Base';
import { languageReducer } from '@/api/LanguageSelect';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        language: languageReducer
    },

    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat([baseApi.middleware]);
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;