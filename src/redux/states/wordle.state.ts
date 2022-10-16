import { createSlice } from "@reduxjs/toolkit"

export const WordleStoreName = 'wordle'

export interface WordleState {
    word: string
    tries: string[]
    lastTime: number
    firstTime: number
    totalTries: number
    successTries: number
}

export const wordleInitialState: WordleState = {
    word: '',
    tries: [],
    lastTime: 0,
    firstTime: 0,
    totalTries: 0,
    successTries: 0,
}

export const wordleSlice = createSlice({
    name: WordleStoreName,
    initialState: wordleInitialState,
    reducers: {
        setWord: (state, action) => ({ ...state, word: action.payload }),
        setTries: (state, action) => ({ ...state, tries: action.payload }),
        setLastTime: (state, action) => ({ ...state, lastTime: action.payload }),
        setFirstTime: (state, action) => ({ ...state, firstTime: action.payload }),
        setTotalTries: (state, action) => ({ ...state, totalTries: action.payload }),
        setSuccessTries: (state, action) => ({ ...state, successTries: action.payload }),
        resetWordleState: () => wordleInitialState,
    },
})

export const {
    setWord,
    setTries,
    setLastTime,
    setFirstTime,
    setTotalTries,
    setSuccessTries,
    resetWordleState,
} = wordleSlice.actions

export default wordleSlice.reducer