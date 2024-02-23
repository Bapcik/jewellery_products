import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { fetchProduct, fetchProductIds } from "../../store/product.slice";
import { useSelector } from "react-redux";
import { TableColumn } from "../../UI/Table/ListTable";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const { productIds, products, isLoading } = useSelector(
    (state: RootState) => state.products
  );

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

  if (isLoading) return <div>Loading...</div>;
  if (!products) return <div>No data</div>;
  if (!productIds) return <div>No data product ID</div>;

  return (
    <div>
      <TableColumn data={products ?? []} />
    </div>
  );
};
