export type Response<T = string[]> = {
  result: T;
};

export enum ActionsRequest {
  Filter = 'filter',
  Get_ids = 'get_ids',
  Get_items = 'get_items',
  Get_fields = 'get_fields',
}

export type Product = {
  brand: string | null;
  id: string;
  price: number;
  product: string;
};

export type Filter = {
  price?: number;
  brand?: string;
  product?: string;
};

export enum FieldParam {
  price = 'price',
  brand = 'brand',
  product = 'product',
}
