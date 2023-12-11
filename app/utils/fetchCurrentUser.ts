import { AppDispatch, useAppSelector } from '../redux/store';
import { signIn, signOut } from '../redux/features/authSlice';

export interface UserInfo {
  username: string;
  email: string;
  sid: string;
  role: string;
  isAuth: boolean;
}

export async function fetchCurrentUser(dispatch: AppDispatch) {
  try {
    const res = await fetch(`/api/auth/currentuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    const authority = data.Authorities;

    switch (authority) {
      case 'USER':
        const userInfo: UserInfo = {
          username: data.username,
          email: data.email,
          sid: data.sid,
          role: data.role,
          isAuth: true,
        };
        dispatch(signIn(userInfo));
        return userInfo;
      default:
        dispatch(signOut());
        return false;
    }
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}
