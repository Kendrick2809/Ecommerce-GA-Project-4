import { createSlice } from "@reduxjs/toolkit";
import {
	getUserDetails,
	registerUser,
	userLogin,
} from "../actions/userActions";

const userInfo = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = {
	loading: false,
	userInfo: userInfo, // for user object
	userToken: null, // for storing the JWT
	error: null,
	success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLogout: (state, action) => {
			localStorage.removeItem("userInfo");
		},
	},
	extraReducers: {
		// register user
		[registerUser.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.userInfo = payload; // registration successful
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		// login user
		[userLogin.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[userLogin.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload;
			state.userToken = payload.token;
		},
		[userLogin.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		[getUserDetails.pending]: (state) => {
			state.loading = true;
		},
		[getUserDetails.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload;
		},
		[getUserDetails.rejected]: (state, { payload }) => {
			state.loading = false;
		},
	},
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
