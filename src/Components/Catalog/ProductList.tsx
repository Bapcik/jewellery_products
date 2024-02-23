import { useEffect, useState } from "react";
import { Button, Input, Pagination, Space, Table } from "antd";
import { RootState, useAppDispatch } from "../../store/store";
import { fetchProduct, fetchProductIds } from "../../store/product.slice";
import { useSelector } from "react-redux";

export const ProductList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductIds());
  }, [dispatch]);

  const { productIds, products, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  const pageSize = 50;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1);
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "product",
      key: "id",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "Бренд",
      dataIndex: "brand",
      key: "id",
    },
  ];

  useEffect(() => {
    if (productIds) {
      dispatch(fetchProduct({ ids: productIds, searchText }));
    }
  }, [dispatch, productIds, searchText]);
  
  
  

  if (isLoading) return <div>Loading...</div>;
  if (!products && !productIds) return <div>No data</div>;
  if (!productIds) return <div>No data</div>;

  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: 16 }}>
        <Input
          placeholder="Поиск по названию"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 400 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Поиск
        </Button>
      </Space>
      <>
        <Table
          dataSource={products ?? []}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
        <Pagination
          current={page}
          total={productIds?.length || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </>
    </div>
  );
};
