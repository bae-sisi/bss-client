import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  username: string;
  email: string;
  uid: string;
  isAdmin: boolean;
}

type AuthState = UserInfo & {
  isAuth: boolean;
};

type initialState = {
  value: AuthState;
};

const initialState = {
  value: {
    isAuth: false,
    username: '',
    email: '',
    uid: '',
    isAdmin: false,
  } as AuthState,
} as initialState;

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserInfo>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload.username,
          email: action.payload.email,
          uid: action.payload.uid,
          isAdmin: action.payload.isAdmin,
        },
      };
    },

    signOut: () => {
      return initialState;
    },
  },
});

export const { signIn, signOut } = auth.actions;
export default auth.reducer;
