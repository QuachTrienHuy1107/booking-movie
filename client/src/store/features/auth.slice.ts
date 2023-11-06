import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  ICredential,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "../../types/auth.type";
// import { persistor } from "store/store";

const initialState: AuthState = {
  credential: {},
  isLoading: false,
  error: null,
  isLoggedIn: false,
  isAuthenticating: true,
};

const authSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    getMe: state => {
      state.isLoading = true;
      state.error = null;
      state.isLoggedIn = false;
    },
    getMeSuccess: (state, action: PayloadAction<ICredential>) => {
      state.credential = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    getMeFailure: (state: any, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoggedIn = false;
    },

    loginAction(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
      state.error = null;
      state.isLoggedIn = false;
    },
    loginActionSuccess(state, action: PayloadAction<ICredential>) {
      state.credential = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    loginActionFailure(state: any, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    logoutAction(state: any) {
      return initialState;
    },

    registerAction(state: any, action: PayloadAction<RegisterPayload>) {
      state.isLoading = true;
      state.error = null;
      state.isLoggedIn = false;
    },
    registerActionSuccess(state: AuthState, action: PayloadAction<ICredential>) {
      state.credential = action.payload;
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
    registerActionFailure(state: any, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoggedIn = false;
    },

    updateProfile: (state, action: PayloadAction<any>) => {
      state.error = null;
      state.isLoading = true;
      state.isSuccess = false;
    },
    updateProfileSuccess: (
      state,
      action: PayloadAction<{ user: ICredential; isSuccess: boolean }>,
    ) => {
      state.isLoading = false;
      state.error = null;
      state.credential = action.payload.user;
      state.isSuccess = action.payload.isSuccess;
    },
    updateProfileFailure: (state: any, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
    },
    resetPassword: (state: any, action: PayloadAction<ResetPasswordPayload>) => {},
    resetPasswordSuccess: () => {},
    resetPasswordFailure: () => {},
  },
});

const { actions, reducer } = authSlice;

export const {
  getMe,
  getMeSuccess,
  getMeFailure,
  loginAction,
  loginActionFailure,
  loginActionSuccess,
  logoutAction,
  registerAction,
  registerActionSuccess,
  registerActionFailure,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
} = actions;

export default reducer;
