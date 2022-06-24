export default class Consts {
  // 0:価格安い樹、1:価格高い順
  static readonly rakutenSortParams: string[] = ['+itemPrice', '-itemPrice'];
  static readonly yahooSortParams: string[] = ['+price', '-price'];

  static readonly YAHOO_MAX_PRICE: number = 99999999 as const;
  static readonly YAHOO_MIN_PRICE: number = 0 as const;

  static readonly RAKUTEN_MAX_PRICE: number = 999999999 as const;
  static readonly RAKUTEN_MIN_PRICE: number = 0 as const;

  // 各API１ページあたりのアイテム数
  static readonly ITEM_COUNT_PER_PAGE = 20;
}
