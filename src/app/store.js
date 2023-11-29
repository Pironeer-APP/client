import { configureStore } from '@reduxjs/toolkit';
import assignsReducer from '../features/assigns/assignsSlice.js';
import accountReducer from '../features/account/accountSlice.js';
import sessionsReducer from '../features/sessions/sessionsSlice.js';
import postsReducer from '../features/posts/postsSlice.js';

export default configureStore({
  reducer: {
    assigns: assignsReducer,
    account: accountReducer,
    sessions: sessionsReducer,
    posts: postsReducer,
  }
})