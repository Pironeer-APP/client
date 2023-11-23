import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { getData } from '../../api/asyncStorage';

const initialState = {
  assigns: [],
  status: 'idle',
  error: null
}

export const fetchAssigns = createAsyncThunk('assigns/fetchAssigns', async () => {
  const userToken = await getData('user_token');
  const res = await client.post('/assign', { userToken });
  return res.data;
})

const assignsSlice = createSlice({
  name: 'assigns',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAssigns.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAssigns.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assigns = action.payload;
      })
      .addCase(fetchAssigns.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export default assignsSlice.reducer;

export const selectAllAssigns = state => state.assigns.assigns;