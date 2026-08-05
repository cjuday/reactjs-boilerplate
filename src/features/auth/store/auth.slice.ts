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
    updateUser: (state, action: PayloadAction<Partial<User>>) => { 
      if(state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        }
      }
    }
  },
});

export const { setCredentials, clearCredentials, updateUser } = authSlice.actions;
export default authSlice.reducer;