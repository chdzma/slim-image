// store.ts
import { configureStore } from '@reduxjs/toolkit'
import configReducer from './reducers/configSlice'
import imgServiceReducer from './reducers/imgServiceSlice'

const store = configureStore({
  reducer: {
    config: configReducer,
    imgService: imgServiceReducer
  }
})

export default store
