import { useEffect, useState } from 'react';
import {
  useFilterMutation,
  useGetFieldsMutation,
  useGetIdsMutation,
  useGetItemsMutation,
} from '../../shared/api';
import { DEFAULT_OFFSET, PAGE_SIZE } from '../../shared/constants';
import { isFetchBaseQueryError } from '../../shared/helpers';
import { Alert, Flex, Pagination, Spin } from 'antd';
import { ProductFilterBar } from '../../features/productFilterBar';
import { ProductCard } from '../../features/productCard';
import { FieldParam } from '../../shared/types';

export const Products = () => {
  // получение списка всех имеющиеся id
  const [getIds, { data: ids, isError }] = useGetIdsMutation();
  // получение списка отфильтрованных id
  const [getFilteredIds, { data: filteredIds }] = useFilterMutation();
  // получение списка товаров
  const [getItems, { data: items, isLoading, isSuccess }] =
    useGetItemsMutation();
  // получение полей товаров
  const [getFields, { data: itemsFields }] = useGetFieldsMutation();
  // состояния input'ов
  const [productValue, setProductValue] = useState<string>('');
  const [priceValue, setPriceValue] = useState<string>('');
  // состояние постраничного перехода
  const [visiblePagination, setVisiblePagination] = useState<boolean>(true);

  const getIdsHandler = async (offset: number = DEFAULT_OFFSET) => {
    try {
      await getIds(offset).unwrap().then();
      // отображаем постраничный переход
      setVisiblePagination(true);
    } catch (err) {
      // выводим ошибку в консоль
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        console.log(errMsg);
      }
    }
  };
  const getItemsHandler = (ids: string[]) => {
    getItems({ ids }).unwrap();
  };
  const getPriceHandler = (price: string) => {
    // скрываем постраничный переход
    setVisiblePagination(false);
    // сбрасываем значение input'а
    setProductValue('');
    getFilteredIds({ price: Number(price) }).unwrap();
  };
  const getBrandHandler = (brand: string) => {
    // сбрасываем значение input'a
    setPriceValue('');
    setProductValue('');
    setVisiblePagination(false);
    // при выбранном значении в поле select "Все бренды" со значением value: '' делаем запрос за всеми товарами
    if (!brand) {
      getIdsHandler();
    } else {
      getFilteredIds({ brand }).unwrap();
    }
  };
  const getProductNameHandler = (product: string) => {
    setVisiblePagination(false);
    setPriceValue('');
    getFilteredIds({ product }).unwrap();
  };

  useEffect(() => {
    if (ids) getItemsHandler(ids);
  }, [ids]);

  useEffect(() => {
    if (filteredIds) getItemsHandler(filteredIds);
  }, [filteredIds]);

  useEffect(() => {
    // запрос за всеми доступными товарами и брендами
    getIdsHandler();
    getFields({ field: FieldParam.brand }).unwrap();
  }, []);

  const options: { value: string; label: string }[] = [
    { value: '', label: 'Выбрать все' },
    ...(itemsFields?.map((i) => ({ value: i, label: i })) || []),
  ];

  return (
    <div style={{ padding: 40 }}>
      <Flex
        justify='center'
        align='center'
        vertical
        gap='30px'
        style={{ marginBottom: 30 }}
      >
        <div>
          <ProductFilterBar
            getIds={getIdsHandler}
            getPrice={getPriceHandler}
            getBrand={getBrandHandler}
            getProductName={getProductNameHandler}
            options={options}
            priceValue={priceValue}
            productValue={productValue}
            setPriceValue={setPriceValue}
            setProductValue={setProductValue}
            isLoading={isLoading}
          />
        </div>
        <div>
          {visiblePagination && (
            <Pagination
              disabled={isLoading}
              defaultCurrent={DEFAULT_OFFSET}
              total={PAGE_SIZE}
              onChange={(n) => {
                getIdsHandler(n);
              }}
            />
          )}
        </div>
      </Flex>
      <Flex justify={'center'} align='center' wrap={'wrap'} gap='15px'>
        {isLoading && <Spin size='large' />}
        {isError && (
          <Alert message='Ошибка при загрузке данных' type='error' showIcon />
        )}
        {isSuccess && !items?.length && (
          <Alert message='Товары не найдены' type='info' showIcon />
        )}
        {items?.map((i) => (
          <ProductCard
            key={i.id}
            product={i.product}
            brand={i.brand}
            price={i.price}
            id={i.id}
          />
        ))}
      </Flex>
    </div>
  );
};
