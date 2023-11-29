import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { getData } from '../../api/asyncStorage';

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const userToken = await getData('user_token');
  const res = await client.post('/post/all', { userToken });
  return res.posts;
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export default postsSlice.reducer;

export const selectAllPosts = state => state.posts.posts;