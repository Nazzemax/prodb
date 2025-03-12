import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
    selectedLanguage: string;
}

const initialState: LanguageState = {
    selectedLanguage: typeof window !== "undefined" ? localStorage.getItem("locale") || "ru" : "ru",
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.selectedLanguage = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("locale", action.payload);
            }
        },
        initLanguage: (state, action: PayloadAction<string>) => {
            state.selectedLanguage = action.payload;
        },
    },
});

export const { actions: languageActions } = languageSlice
export const { reducer: languageReducer } = languageSlice