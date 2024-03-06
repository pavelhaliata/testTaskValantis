import { useEffect, useState } from 'react';
import {
  useFilterMutation,
  useGetIdsMutation,
  useGetItemsMutation,
} from '../../../shared/api';
import {
  Button,
  Card,
  Flex,
  Input,
  Pagination,
  Space,
  Spin,
  Typography,
} from 'antd';
import { DEFAULT_OFFSET, PAGE_SIZE } from '../../../shared/constants';

const { Text } = Typography;

export const Items = () => {
  const [getIds, { data: ids }] = useGetIdsMutation();
  const [getFilteredIds, { data: filteredIds }] = useFilterMutation();
  const [getItems, { data: items, isLoading }] = useGetItemsMutation();
  const [brandValue, setBrandValue] = useState<string>('');
  const [productValue, setProductValue] = useState<string>('');
  const [priceValue, setPriceValue] = useState<string>('');

  const getIdsHandler = (offset: number = DEFAULT_OFFSET) => {
    getIds(offset).unwrap();
  };
  const getItemsHandler = (ids: string[]) => {
    getItems({ ids }).unwrap();
  };
  const getFilteredIdsHandler = (price: string) => {
    getFilteredIds({ price: Number(price) }).unwrap();
    setBrandValue('');
    setProductValue('');
    setPriceValue('');
  };

  useEffect(() => {
    getIdsHandler();
  }, []);

  useEffect(() => {
    if (ids) getItemsHandler(ids);
  }, [ids]);

  useEffect(() => {
    if (filteredIds) getItemsHandler(filteredIds);
  }, [filteredIds]);

  return (
    <div style={{ padding: '30px', width: '100%' }}>
      <Flex
        justify='center'
        align='center'
        vertical
        gap='30px'
        style={{ marginBottom: 30 }}
      >
        <Pagination
          disabled={isLoading}
          defaultCurrent={DEFAULT_OFFSET}
          total={PAGE_SIZE}
          onChange={(e) => {
            getIdsHandler(e);
          }}
        />
        <div>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              type='text'
              value={brandValue}
              onChange={(e) => {
                setBrandValue(e.target.value);
              }}
              placeholder='бренд'
            />
            <Input
              type='text'
              value={productValue}
              onChange={(e) => {
                setProductValue(e.target.value);
              }}
              placeholder='продукт'
            />
            <Input
              type='number'
              value={priceValue}
              onChange={(e) => {
                setPriceValue(e.target.value);
              }}
              placeholder='цена'
            />
            <Button
              disabled={isLoading}
              onClick={() => {
                getFilteredIdsHandler(priceValue);
              }}
              type='primary'
            >
              Применить фильтр
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => {
                getIdsHandler();
              }}
              type='primary'
            >
              Сбросить фильтр
            </Button>
          </Space.Compact>
        </div>
      </Flex>
      <Flex justify={'center'} align='center' wrap={'wrap'} gap='15px'>
        {isLoading && <Spin size='large' />}
        {items?.map((i) => (
          <Card
            title={i.product ? i.product : 'Без названия'}
            style={{
              maxWidth: 440,
              width: '100%',
            }}
            key={i.id}
          >
            <Text strong style={{ display: 'block' }}>
              Бренд: {i.brand ? i.brand : 'Без бренда'}
            </Text>
            <Text strong style={{ display: 'block' }}>
              Цена: {i.price}
            </Text>
            <Text type='secondary'>id: {i.id}</Text>
          </Card>
        ))}
      </Flex>
    </div>
  );
};
