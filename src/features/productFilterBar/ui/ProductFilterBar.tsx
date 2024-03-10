import { Button, Input, Select, Space } from 'antd';

type FilterBar = {
  isLoading: boolean;
  options: { value: string; label: string }[];
  productValue: string;
  priceValue: string;
  getBrand: (brand: string) => void;
  getProductName: (product: string) => void;
  getPrice: (price: string) => void;
  getIds: () => void;
  setProductValue: (product: string) => void;
  setPriceValue: (price: string) => void;
};

export const ProductFilterBar = ({
  isLoading,
  options,
  productValue,
  priceValue,
  getBrand,
  getProductName,
  getPrice,
  getIds,
  setProductValue,
  setPriceValue,
}: FilterBar) => {
  return (
    <Space>
      <Select
        disabled={isLoading}
        style={{ width: 180 }}
        options={options}
        onChange={(e) => getBrand(e)}
        placeholder='бренд'
      />
      <Input
        type='text'
        value={productValue}
        onChange={(e) => setProductValue(e.target.value)}
        placeholder='продукт'
      />
      <Button
        disabled={isLoading}
        onClick={() => getProductName(productValue)}
        type='primary'
      >
        Поиск по названию товара
      </Button>
      <Input
        type='number'
        value={priceValue}
        onChange={(e) => setPriceValue(e.target.value)}
        placeholder='цена'
      />
      <Button
        disabled={isLoading}
        onClick={() => getPrice(priceValue)}
        type='primary'
      >
        Поиск по цене
      </Button>
      {/*сбрасываем значение всех фильтров и делаем запрос за списком всех товаров*/}
      <Button
        disabled={isLoading}
        onClick={() => {
          setProductValue('');
          setPriceValue('');
          getIds();
        }}
        type='primary'
      >
        Сбросить фильтр
      </Button>
    </Space>
  );
};
