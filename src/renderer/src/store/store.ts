// store.ts
import { configureStore } from '@reduxjs/toolkit'
import configReducer from './reducers/configSlice'

const store = configureStore({
  reducer: {
    config: configReducer
  }
})

export default store
