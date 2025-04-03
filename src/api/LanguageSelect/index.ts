import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
    selectedLanguage: string;
}

const initialState: LanguageState = {
    selectedLanguage: "ru" // ✅ Always safe to start with default
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
        // Optional: useful for hydration or bootstrapping
        initLanguage: (state, action: PayloadAction<string>) => {
            state.selectedLanguage = action.payload;
        },
    },
});

export const { actions: languageActions } = languageSlice;
export const { reducer: languageReducer } = languageSlice;
