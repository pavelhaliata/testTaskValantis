export type Response<T = []> = {
  result: T;
};

export enum ActionsRequest {
  Filter = 'filter',
  Get_ids = 'get_ids',
  Get_items = 'get_items',
  Get_fields = 'get_fields',
}

export type Item = {
  brand: string | null;
  id: string;
  price: number;
  product: string;
};
