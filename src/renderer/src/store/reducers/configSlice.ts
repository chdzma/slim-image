import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Config } from '../../helper/config'

interface ConfigState {
  config: Config
  loading: boolean
  error: string | null
}

const initialState: ConfigState = {
  config: {
    tinypngKey: '',
    replaceImage: false,
    convertToWebp: false,
    convertToPng: false,
    convertToJpg: false
  },
  loading: false,
  error: null
}

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Config>) {
      state.config = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    }
  }
})

export const { setConfig, setLoading, setError } = configSlice.actions
export default configSlice.reducer
