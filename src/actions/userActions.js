import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// userAction.js
export const registerUser = createAsyncThunk(
	// action type string
	"user/register",
	// callback function
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			// make request to backend
			await axios.post(
				`/api/users/register/`,
				{ name, email, password },
				config
			);
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const userLogin = createAsyncThunk(
	"user/login",
	async ({ username, password }, { rejectWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			console.log({ username, password });
			const { data } = await axios.post(
				`/api/users/login/`,
				{ username, password },
				config
			);

			// store user's token in local storage
			localStorage.setItem("userInfo", JSON.stringify(data));
			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const getUserDetails = createAsyncThunk(
	"user/getUserDetails",
	async (arg, { getState, rejectWithValue }) => {
		try {
			// get user data from store
			const { user } = getState();
			console.log({ user });

			// configure authorization header with user's token
			const config = {
				headers: {
					Authorization: `Bearer ${user.userToken}`,
				},
			};
			console.log({ data });
			const { data } = await axios.get(`/api/users/profile/`, config);

			return data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
