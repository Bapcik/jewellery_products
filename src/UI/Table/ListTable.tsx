import { Table, Pagination } from "antd";
import { IProduct } from "../../interfaces/IProduct";
import { FC, useState } from "react";

interface TableColumnProps {
  data: IProduct[] | null;
}

export const TableColumn: FC<TableColumnProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Название",
      dataIndex: "product",
      key: "product",
      width: '40%',
      ...getColumnSearchProps('name'),
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      width: '20%',
      ...getColumnSearchProps('price'),
    },
    {
      title: "Бренд",
      dataIndex: "brand",
      key: "brand",
      width: '30%',
      ...getColumnSearchProps('brand'),

    },
  ];

  

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const paginatedData = data
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  return (
    <div>
      <Table dataSource={paginatedData} columns={columns} pagination={false} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data ? data.length : 0}
        onChange={handleChangePage}
        onShowSizeChange={handleChangePageSize}
        showSizeChanger
        pageSizeOptions={["10", "20", "50", "100"]}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  );
};
