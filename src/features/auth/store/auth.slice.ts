import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => { state.accessToken = action.payload },
    clearCredentials: (state) => { state.accessToken = null },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;