import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  username: string;
  email: string;
  sid: string;
  role: string;
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
    sid: '',
    role: '',
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
          sid: action.payload.sid,
          role: action.payload.role,
        },
      };
    },

    signOut: () => {
      return initialState;
    },

    setGlobalUsername: (state, action: PayloadAction<string>) => {
      state.value.username = action.payload;
    },

    setGlobalEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
  },
});

export const { signIn, signOut, setGlobalUsername, setGlobalEmail } =
  auth.actions;
export default auth.reducer;
