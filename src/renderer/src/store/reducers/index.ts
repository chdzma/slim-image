// En el archivo configSlice.ts (o donde tengas definido el reducer)
import { combineReducers } from '@reduxjs/toolkit'
import configReducer from './configSlice'

const rootReducer = combineReducers({
  config: configReducer
})

export type RootState = ReturnType<typeof rootReducer>
