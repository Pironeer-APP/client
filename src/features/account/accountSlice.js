import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../../api/asyncStorage';
import { client } from '../../api/client';

const initialState = {
  account: {},
  jwt: '',
  status: 'idle',
  error: null
}

export const fetchAccount = createAsyncThunk('account/fetchAccount', async () => {
  const userToken = await getData('user_token');
  const {account, jwt} = await client.post('/auth/getAccount', {userToken});
  return {account, jwt};
})

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAccount.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.account = action.payload.account;
        state.jwt = action.payload.jwt;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export default accountSlice.reducer;

export const selectAccount = state => state.account.account;
export const selectJwt = state => state.account.jwt;