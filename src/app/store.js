import { configureStore } from '@reduxjs/toolkit';
import assignsReducer from '../features/assigns/assignsSlice.js';
import accountReducer from '../features/account/accountSlice.js';
import sessionsReducer from '../features/sessions/sessionsSlice.js';

export default configureStore({
  reducer: {
    assigns: assignsReducer,
    account: accountReducer,
    sessions: sessionsReducer,
  }
})