import { Item } from '../type/Item.type';
import { useLocalStorage } from './localStorage';
import { CustomerInfo } from '../type/CustomerInfo.type';

export function sortItems(items: Item[], sort: number) {
  // sortとポイント込みの変数分割
  // TODO:ダサいのでなんとか
  let orderBy: string = 'price';
  let orderAsc: boolean = true;

  switch (sort) {
    case 0:
      orderBy = 'price';
      orderAsc = true;
      break;
    case 1:
      orderBy = 'price';
      orderAsc = false;
      break;
    case 2:
      orderBy = 'total';
      orderAsc = true;
      break;
    case 3:
      orderBy = 'total';
      orderAsc = false;
      break;
    default:
      orderBy = 'price';
      orderAsc = true;
  }
  if (orderAsc) {
    return sortItemsAsc(items, orderBy);
  } else {
    return sortItemsDesc(items, orderBy);
  }
}

function sortItemsAsc(items: Item[], key: string) {
  return items.sort((a, b) => {
    if (getItemType(a, key) < getItemType(b, key)) return -1;
    if (getItemType(a, key) > getItemType(b, key)) return 1;
    return 0;
  });
}

function sortItemsDesc(items: Item[], key: string) {
  return items.sort((a, b) => {
    if (getItemType(a, key) > getItemType(b, key)) return -1;
    if (getItemType(a, key) < getItemType(b, key)) return 1;
    return 0;
  });
}

function getItemType(item: Item, key: string) {
  switch (key) {
    case 'price':
      return item.price;
    case 'point':
      return item.point;
    case 'total':
      return item.totalPrice;
    default:
      return item.price;
  }
}
export function getSearchOrder(sort: string): number {
  switch (sort) {
    case '0':
      return 0;
    case '1':
      return 1;
    case '2':
      return 0;
    case '3':
      return 1;
    default:
      return 0;
  }
}

// TODO:未実装
export function getRakutenPointRate() {
  const [customerInfo, setCustomerInfo] = useLocalStorage();
  const hasRakutenCard = customerInfo.hasRakutenCard;
}

/**
 * 
 * 楽天会員	+ 1 倍
楽天モバイル	+ 1 倍
楽天モバイルキャリア決済	+ 0.5 倍
楽天ひかり	+ 1 倍
楽天カード 通常分	+ 1 倍
楽天カード 特典分	+ 1 倍
楽天プレミアムカード 特典分	+ 2 倍
楽天銀行+楽天カード	+ 1 倍
楽天証券 投資信託	+ 0.5 倍
楽天証券 米国株式	+ 0.5 倍
楽天ウォレット	+ 0.5 倍
楽天トラベル	+ 1 倍
楽天市場アプリ	+ 0.5 倍
楽天ブックス	+ 0.5 倍
楽天Kobo	+ 0.5 倍
Rakuten Pasha	+ 0.5 倍
Rakuten Fashionアプリ	+ 0.5 倍
楽天ビューティ	+ 0.5 倍

 */
// TODO:未実装
export function getRakutenRate(customerInfo: CustomerInfo) {
  let rate = 1;
  if (customerInfo.hasRakutenMobile) {
    rate = rate + 1;
  }
  if (customerInfo.hasRakutenBank) {
    rate = rate + 1;
  }
  if (customerInfo.hasRakutenCard) {
    rate = rate + 2;
  }
  if (customerInfo.hasRakutenSecurities) {
    rate = rate + 0.5;
  }

  return rate;
}
