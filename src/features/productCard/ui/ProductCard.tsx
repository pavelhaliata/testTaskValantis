import { Card, Typography } from 'antd';
import { Product } from '../../../shared/types';

const { Text } = Typography;

export const ProductCard = ({ id, product, brand, price }: Product) => {
  return (
    <Card
      title={product ? product : 'Без названия'}
      style={{
        maxWidth: 440,
        width: '100%',
      }}
      key={id}
    >
      <Text strong style={{ display: 'block' }}>
        Бренд: {brand ? brand : 'Без бренда'}
      </Text>
      <Text strong style={{ display: 'block' }}>
        Цена: {price}
      </Text>
      <Text type='secondary'>id: {id}</Text>
    </Card>
  );
};
