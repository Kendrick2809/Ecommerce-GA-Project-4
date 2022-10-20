import { createSlice, current } from "@reduxjs/toolkit";

const items =
	localStorage.getItem("cartItems") != null
		? JSON.parse(localStorage.getItem("cartItems"))
		: [];

const initialState = {
	cartItems: items,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x.product === item.product);

			if (existItem) {
				existItem.qty = Number(existItem.qty) + Number(item.qty);
			} else {
				state.cartItems.push(item);
			}

			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		updateCartQuantity: (state, action) => {
			const { productId, quantity } = action.payload;

			console.log(state.cartItems[0]);
			console.log(current(state));

			const updatedProduct = state.cartItems.find(
				(x) => x.product === productId
			);

			updatedProduct.qty = quantity;

			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
	},
});

export const { addToCart, updateCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
