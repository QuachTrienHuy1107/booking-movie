import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, RegisterPayload, LoginResponse, ICredential } from "../../types/auth.type";
import { persistor } from "store/store";

const initialState: AuthState = {
    credential: {},
    isLoading: false,
    error: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: "authslice",
    initialState,
    reducers: {
        loginAction(state, action: PayloadAction<LoginPayload>) {
            state.isLoading = true;
            state.error = null;
            state.isAuth = false;
        },
        loginActionSuccess(state, action: PayloadAction<LoginResponse>) {
            state.credential = action.payload;
            state.isLoading = false;
            state.isAuth = true;
        },
        loginActionFailure(state, action) {
            state.error = action.payload;
            state.isLoading = false;
            state.isAuth = false;
        },
        logoutAction(state: any) {
            return initialState;
        },

        registerAction(state: any, action: PayloadAction<RegisterPayload>) {
            state.isLoading = true;
            state.error = null;
        },
        registerActionSuccess(state: AuthState, action: PayloadAction<ICredential>) {
            state.credential.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        registerActionFailure(state: any, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        updateProfile: (state, action: PayloadAction<any>) => {
            state.error = null;
            state.isLoading = true;
            state.isSuccess = false;
        },
        updateProfileSuccess: (state, action: PayloadAction<{ user: ICredential; isSuccess: boolean }>) => {
            state.isLoading = false;
            state.error = null;
            state.credential.user = action.payload.user;
            state.isSuccess = action.payload.isSuccess;
        },
        updateProfileFailure: (state: any, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.isSuccess = false;
        },
    },
});

const { actions, reducer } = authSlice;

export const {
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
} = actions;

export default reducer;
