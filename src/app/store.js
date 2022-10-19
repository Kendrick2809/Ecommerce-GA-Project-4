import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { productApi } from "../slice/product-api-slice";
import { productDetailApi } from "../slice/product-detail-api-slice";

export const store = configureStore({
	reducer: {
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
