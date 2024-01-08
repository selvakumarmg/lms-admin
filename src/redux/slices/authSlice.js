import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  authData: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'loginAuth',
  initialState,
  reducers: {
    setAuthList: (state, action) => {
      state.authData = action.payload;
    },
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Action to set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAuthList,
  setLoading,
  setError,
} = authSlice.actions;

export const loginAuthData = (state) => state.customer.authData;
export const selectLoading = (state) => state.customer.loading;
export const selectError = (state) => state.customer.error;

export default authSlice.reducer;
