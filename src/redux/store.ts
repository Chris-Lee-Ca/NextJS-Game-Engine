import { configureStore } from '@reduxjs/toolkit'
import { playerReducer } from './features/playerSlice'

export const makeGameStore = () => {
  return configureStore({
    reducer: {
        player: playerReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeGameStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']