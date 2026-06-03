import { api } from "../../config/apiConfig";

import {
  HOME_PRODUCTS_FAILURE,
  HOME_PRODUCTS_REQUEST,
  HOME_PRODUCTS_SUCCESS,
} from "./HomeActionTypes";

export const getHomeProducts = () => async (dispatch) => {
  dispatch({ type: HOME_PRODUCTS_REQUEST });

  try {
    const result = await Promise.all([
      api.get("/products", {
        params: { category: "mens_shirts", pageSize: 10 },
      }),
      api.get("/products", { params: { category: "lehenga", pageSize: 10 } }),
      api.get("/products", {
        params: { category: "mens_jeans", pageSize: 10 },
      }),
      api.get("/products", { params: { category: "saree", pageSize: 10 } }),
      api.get("/products", {
        params: { category: "mens_kurta", pageSize: 10 },
      }),
    ]);

    // const print = result?.map((r) => console.log(r.data));

    const data = {
      mens_shirts: result[0].data.products,
      lehenga: result[1].data.products,
      mens_jeans: result[2].data.products,
      saree: result[3].data.products,
      mens_kurta: result[4].data.products,
    };

    dispatch({ type: HOME_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOME_PRODUCTS_FAILURE, payload: error.message });
  }
};
