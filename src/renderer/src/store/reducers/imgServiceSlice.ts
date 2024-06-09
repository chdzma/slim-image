// En un archivo llamado ImageServiceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImageServiceData {
    compressions: number;
}

const initialState: ImageServiceData = {
    compressions: 0,
};

const imageServiceSlice = createSlice({
  name: 'imageService',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ImageServiceData>) => {
      state.compressions = action.payload.compressions;
    },
  },
});

export const { setData } = imageServiceSlice.actions;

export default imageServiceSlice.reducer;
