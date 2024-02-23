import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/IProduct";
// import { axiosInstance } from "../api/axiosInstance";
import md5 from "md5";
import { IFilter } from "../interfaces/IFilter";
import axios from 'axios'

interface IInitialState {
  filter: IFilter | null;
  products: IProduct[] | null;
  productIds: string[] | null;
  filteredProductsIds: string[] | null;
  filteredProducts: IProduct[] | null;
  isLoading: boolean;
}

const initialState: IInitialState = {
  filter: null,
  products: null,
  productIds: null,
  filteredProductsIds: null,
  filteredProducts: null,
  isLoading: false,
};

const password = md5(
  "Valantis_" + new Date().toISOString().slice(0, 10).replace(/-/g, "")
);

export const fetchProductIds = createAsyncThunk(
  "products/fetchProductIds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://api.valantis.store:40000/",
        {
          action: "get_ids",
          params: { limit: 400 },
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
      const response = await axios.post(
        "http://api.valantis.store:40000/",
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

export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async (
    variables: { name: string; price: number; brand: string },
    { rejectWithValue }
  ) => {
    const { name, price, brand } = variables;

    const params: any = {};
    if (name) params.product = name;
    if (price) params.price = price;
    if (brand) params.brand = brand;
    console.log(params, "params");
    try {
      const response = await axios.post(
        "http://api.valantis.store:40000/",
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

      return response.data;
    } catch (error) {
      console.error("Error fetching filter products ids:", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchFilterProducts = createAsyncThunk(
  "products/fetchFilterProducts",
  async (variables: { ids: string[] }, { rejectWithValue }) => {
    const { ids } = variables;

    try {
      const response = await axios.post(
        "http://api.valantis.store:40000/",
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
      console.error("Error fetching filter products:", error);
      return rejectWithValue(error);
    }
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
        state.isLoading = false;
      })

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
      .addCase(filterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.filteredProductsIds = action.payload.result;
        state.isLoading = false;
      })
      .addCase(filterProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload.result;
        state.isLoading = false;
      })
      .addCase(fetchFilterProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
