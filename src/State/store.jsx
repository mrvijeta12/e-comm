import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/cartReducer";
import { orderReducer } from "./Order/orderReducer";
import { adminProductReducer } from "./Admin/AdminProduct/AdminProductReducer";
import { adminOrderReducer } from "./Admin/AdminOrder/AdminOrderReducer";
import { paymentReducer } from "./Admin/AdminPayment/AdminPaymentReducer";
import { homeReducer } from "../customers/HomeState/HomeReducer";
import { toastReducer } from "../customers/components/Toast/ToastReducer";

const rootreducers = combineReducers({
  auth: authReducer,
  products: customerProductReducer,
  cart: cartReducer,
  orders: orderReducer,
  adminProducts: adminProductReducer,
  adminOrders: adminOrderReducer,
  payments: paymentReducer,
  homeProducts: homeReducer,
  toast: toastReducer,
});

export const store = legacy_createStore(rootreducers, applyMiddleware(thunk));
