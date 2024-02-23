import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/IProduct";
import { axiosInstance } from "../api/axiosInstance";
import md5 from "md5";
import { IFilter } from "../interfaces/IFilter";

interface IInitialState {
  filter: IFilter | null;
  products: IProduct[] | null;
  productIds: string[] | null;
  isLoading: boolean;
}

const initialState: IInitialState = {
  filter: null,
  products: null,
  productIds: null,
  isLoading: false,
};

const password = md5(
  "Valantis_" + new Date().toISOString().slice(0, 10).replace(/-/g, "")
);

export const fetchProductIds = createAsyncThunk(
  "products/fetchProductIds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/",
        {
          action: "get_ids",
          params: { limit: 2000 },
        },
        {
          headers: {
            "X-Auth": password,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product ids:", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (variables: { ids: string[] }, { rejectWithValue }) => {
    const { ids } = variables;

    try {
      const response = await axiosInstance.post(
        "/",
        {
          action: "get_items",
          params: {
            ids,
          },
        },
        {
          headers: {
            "X-Auth": password,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error);
    }
  }
);

export const filterProducts = createAsyncThunk<IProduct[], IFilter>(
  "products/filterProducts",
  async (filters) => {
    const { name, price, brand } = filters;

    const params: any = {};
    if (name) params.product = name;
    if (price) params.price = price;
    if (brand) params.brand = brand;

    const response = await axiosInstance.post(
      "/",
      {
        action: "filter",
        params,
      },
      {
        headers: {
          "X-Auth": password,
        },
      }
    );
    return response.data.result;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = action.payload.result;
        state.isLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProductIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductIds.fulfilled, (state, action) => {
        state.productIds = action.payload.result;
        state.isLoading = false;
      })
      .addCase(fetchProductIds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(filterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(filterProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
