import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import {
  fetchFilterProducts,
  fetchProduct,
  fetchProductIds,
} from "../../store/product.slice";
import { useSelector } from "react-redux";
import { TableColumn } from "../../UI/Table/ListTable";
import { ProductFiltering } from "../../UI/Input/FilteringForm";
import { Spin } from "antd";
import { Alert } from "antd";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const {
    productIds,
    products,
    isLoading,
    filteredProductsIds,
    filteredProducts,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProductIds());
  }, [dispatch]);

  useEffect(() => {
    if (productIds) {
      const uniqueArray = productIds.filter(
        (value, index, self) => self.indexOf(value) === index
      );

      dispatch(fetchProduct({ ids: uniqueArray }));
    }
  }, [dispatch, productIds]);

  console.log(filteredProductsIds, "filteredProductsIds");

  useEffect(() => {
    if (filteredProductsIds) {
      dispatch(fetchFilterProducts({ ids: filteredProductsIds }));
    }
  }, [dispatch, filteredProductsIds]);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <Spin style={{ padding: 40 }} size="large" />
      </div>
    );

  if (!products) return <Alert message="No data" type="info" />;
  if (!productIds) return <Alert message="No data product ID" type="info" />;
  if (!filteredProducts && filteredProductsIds)
    return <Alert message="Error fetching filtered products" type="error" />;

  return (
    <div>
      <ProductFiltering />
      <TableColumn data={filteredProducts ? filteredProducts : products} />
    </div>
  );
};
