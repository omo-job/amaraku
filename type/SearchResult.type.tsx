import { Item } from './Item.type';

export type SearchResult = {
  allCount: number;
  startCount: number;
  endCount: number;
  allPage: number;
  currentPage: number;
  items: Item[];
};
