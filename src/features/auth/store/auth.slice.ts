import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/responses/auth-response';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  initialized: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  initialized: false,
};

interface AuthPayload {
  accessToken: string;
  user: User;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => { state.accessToken = action.payload.accessToken; state.user = action.payload.user; state.initialized = true; },
    clearCredentials: (state) => { state.accessToken = null; state.user = null; state.initialized = true; },
    setAuthInitialized: (state) => { state.initialized = true; },
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

export const { setCredentials, clearCredentials, updateUser, setAuthInitialized } = authSlice.actions;
export default authSlice.reducer;