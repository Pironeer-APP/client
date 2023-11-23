import { configureStore } from '@reduxjs/toolkit';
import assignsReducer from '../features/assigns/assignsSlice.js';

export default configureStore({
  reducer: {
    assigns: assignsReducer
  }
})