import { useEffect, useState } from "react";
import { Button, Input, Pagination, Space, Table } from "antd";
import { RootState, useAppDispatch } from "../../store/store";
import { fetchProduct, fetchProductIds } from "../../store/product.slice";
import { useSelector } from "react-redux";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const [ids, setIds] = useState(new Set<string>());

  const { productIds, products, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  console.log(productIds);

  useEffect(() => {
    dispatch(fetchProductIds());
  }, [dispatch]);

  useEffect(() => {
    if (productIds) {
      const newIds = productIds.filter((id: string) => !ids.has(id));
      if (newIds.length > 0) {
        setIds((prevIds) => new Set([...prevIds, ...newIds]));
      }
    }
  }, [productIds, ids]);

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
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Название",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Бренд",
      dataIndex: "brand",
      key: "brand",
    },
  ];

  useEffect(() => {
    if (productIds && productIds.length > 0) {
      productIds.forEach((id) => {
        dispatch(fetchProduct({ id, pageSize, searchText }));
      });
    }
  }, [dispatch, productIds, pageSize, searchText]);

  if (isLoading) return <div>Loading...</div>;
  if (!products && !productIds) return <div>No data</div>;

  return (
    <div>
      {/* <ul>
        {[...ids].map((productId) => (
          <li key={productId}>{productId}</li>
        ))}
      </ul> */}

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
