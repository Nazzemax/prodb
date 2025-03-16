import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/api/Base";
import { languageReducer } from "@/api/LanguageSelect";
import { formAPI } from "@/api/Form";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [formAPI.reducerPath]: formAPI.reducer,
    language: languageReducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      baseApi.middleware,
      formAPI.middleware,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
