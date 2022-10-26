import { createSlice } from "@reduxjs/toolkit";

import { createOrder } from "../actions/orderActions";

const initialState = {
	order: null,
	loading: false,
	error: null,
	success: false,
	reset: "",
};

const orderSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetOrder: (state, action) => {
			state.order = null;
			state.success = false;
		},
	},
	extraReducers: {
		[createOrder.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[createOrder.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.order = payload;
		},
		[createOrder.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
