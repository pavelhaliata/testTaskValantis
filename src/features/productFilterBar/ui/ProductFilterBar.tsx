import { Button, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type FilterBar = {
  isLoading: boolean;
  options: {
    value: string;
    label: string;
  }[];
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
    <Space align='center' wrap>
      <Select
        disabled={isLoading}
        options={options}
        onChange={(e) => getBrand(e)}
        placeholder='бренд'
        style={{ width: 190 }}
      />
      <Space.Compact>
        <Input
          type='text'
          value={productValue}
          onChange={(e) => setProductValue(e.target.value)}
          placeholder='продукт'
        />
        <Button
          block
          disabled={isLoading}
          onClick={() => getProductName(productValue)}
          type='primary'
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          icon={<SearchOutlined />}
        >
          Поиск по названию
        </Button>
      </Space.Compact>
      <Space.Compact>
        <Input
          type='number'
          value={priceValue}
          onChange={(e) => setPriceValue(e.target.value)}
          placeholder='цена'
        />
        <Button
          block
          disabled={isLoading}
          onClick={() => getPrice(priceValue)}
          type='primary'
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          icon={<SearchOutlined />}
        >
          Поиск по цене
        </Button>
      </Space.Compact>
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
