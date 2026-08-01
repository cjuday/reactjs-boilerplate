import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/responses/auth-response';

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

interface AuthPayload {
  accessToken: string;
  user: User;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => { state.accessToken = action.payload.accessToken; state.user = action.payload.user; },
    clearCredentials: (state) => { state.accessToken = null; state.user = null; },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;