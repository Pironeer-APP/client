import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../../api/asyncStorage';
import { client } from '../../api/client';

const initialState = {
  sessions: [],
  status: 'idle',
  error: null
}

export const fetchSessions = createAsyncThunk('sessions/fetchSessions', async () => {
  const userToken = await getData('user_token');
  const {sessions} = await client.post('/session/getSessions', {userToken});
  return sessions;
})

const sessionsSlice = createSlice({
  name: 'adminSessions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSessions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export default sessionsSlice.reducer;

export const selectSessions = state => state.sessions.sessions;