import { configureStore } from '@reduxjs/toolkit'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import wordleReducer from "@/redux/states/wordle.state";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const wordlePersistedReducer = persistReducer(persistConfig, wordleReducer)

export const store = configureStore({
    reducer: {
        wordle: wordlePersistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch