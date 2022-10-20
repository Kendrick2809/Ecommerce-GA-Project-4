import { configureStore } from "@reduxjs/toolkit"; //wrapper, automatically add thunk etc
import { setupListeners } from "@reduxjs/toolkit/query";

import { productApi } from "../slice/product-api-slice";
import { productDetailApi } from "../slice/product-detail-api-slice";
import cartReducer from "../slice/cart-api-slice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		[productApi.reducerPath]: productApi.reducer,
		[productDetailApi.reducerPath]: productDetailApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			productApi.middleware,
			productDetailApi.middleware
		),
});

setupListeners(store.dispatch);
