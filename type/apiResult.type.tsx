import { Item } from './Item.type';

export type apiResult = {
  count: number;
  allPages: number;
  currentPage: number;
  items: Item[];
};
