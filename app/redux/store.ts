import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import selectSubjectInModal from './features/selectSubjectInModalSlice';
import selectSubject from './features/selectSubjectSlice';
import selectedPostForDeleteSlice from './features/selectedPostForDeleteSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    authReducer,
    selectSubjectInModal,
    selectSubject,
    selectedPostForDeleteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
