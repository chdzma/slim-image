// En el archivo configSlice.ts (o donde tengas definido el reducer)
import { combineReducers } from '@reduxjs/toolkit'
import configReducer from './configSlice'
import imgServiceReducer from './imgServiceSlice'

const rootReducer = combineReducers({
  config: configReducer,
  imgService: imgServiceReducer
})

export type RootState = ReturnType<typeof rootReducer>
