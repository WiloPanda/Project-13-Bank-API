import { createSlice } from "@reduxjs/toolkit"
import { AuthApi } from "@/Services/authApi";

const initialState = {
    isError: null,
    isNetworkError: false,
    isSuccess: false,
    isLoading: false,
    token: AuthApi.getToken(),
}

export const authReducer = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isError = null
            state.isNetworkError = false
            state.isSuccess = false
            state.isLoading = false
            state.token = null
        },

        setToken: (state, action) => {
            state.token = action.payload
        },
    },

})

export const { login, setToken } = authReducer.actions;
export default authReducer.reducer;