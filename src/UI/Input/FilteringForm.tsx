import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { filterProducts } from "../../store/product.slice";
import { Space, Input, Button } from "antd";

export const ProductFiltering = () => {
  const dispatch = useAppDispatch();
  const [nameFilter, setNameFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [brandFilter, setBrandFilter] = useState<string>("");

  const handleChange = () => {
    dispatch(
      filterProducts({
        name: nameFilter,
        price: priceFilter,
        brand: brandFilter,
      })
    );
  };

  const handleReset = () => {
    setNameFilter("");
    setPriceFilter(0);
    setBrandFilter("");
    handleChange();
    window.location.reload();
  };

  return (
    <div style={{ margin: 40 }}>
      <Space>
        <Input
          placeholder="Название"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <Input
          placeholder="Цена"
          value={priceFilter.toString()}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setPriceFilter(isNaN(value) ? 0 : value);
          }}
        />
        <Input
          placeholder="Бренд"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        />
        <Button type="primary" onClick={handleChange}>
          Применить фильтр
        </Button>
        <Button onClick={handleReset}>Сбросить</Button>
      </Space>
    </div>
  );
};
