import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { IProduct } from "../interfaces/IProduct";
import { axiosInstance } from "../api/axiosInstance";
import md5 from "md5";
// import { message } from "antd";

interface IInitialState {
  products: IProduct[] | null;
  productIds: string[] | null;
  isLoading: boolean;
}

const initialState: IInitialState = {
  productIds: null,
  products: null,
  isLoading: false,
};

const password = md5(
  "Valantis_" + new Date().toISOString().slice(0, 10).replace(/-/g, "")
);

export const fetchProductIds = createAsyncThunk(
  "products/fetchProductIds",
  async () => {
    // try {
      const response = await axiosInstance.post(
        "/",
        {
          action: "get_ids",
          params: { offset: 0, limit: 51 },
        },
        {
          headers: {
            "X-Auth": password,
          },
        }
      );
      return response.data;
    // } catch (error) {
    //   if (axios.isAxiosError(error) && error.response) {
    //     const serverMessage = error.response.data.message;
    //     message.error(serverMessage || "Произошла ошибка при запросе товара.");
    //   } else {
    //     message.error("Произошла неизвестная ошибка.");
    //   }
    //   throw error;
    // }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (variables: {
    id: string;
    pageSize: number;
    searchText: string;
  }) => {
    const { id, pageSize, searchText } = variables;

    // try {
      const response = await axiosInstance.post(
        "/",
        {
          action: "get_items",
          params: {
            ids: [id],
            limit: pageSize,
            filter: searchText,
          },
        },
        {
          headers: {
            "X-Auth": password,
          },
        }
      );
      return response.data;
    // } catch (error) {
    //   if (axios.isAxiosError(error) && error.response) {
    //     const serverMessage = error.response.data.message;
    //     message.error(serverMessage || "Произошла ошибка при запросе товара.");
    //   } else {
    //     message.error("Произошла неизвестная ошибка.");
    //   }
    //   throw error;
    // }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductIds.fulfilled, (state, action) => {
        state.productIds = action.payload.result;
        state.isLoading = false;
      })
      .addCase(fetchProductIds.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = action.payload.result;
        state.isLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = true;
      });
  },
});
