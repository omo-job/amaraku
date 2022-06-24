import Consts from '../utils/const';
import { SearchResult } from '../type/SearchResult.type';
import { Item } from '../type/Item.type';
import { apiResult } from '../type/apiResult.type';
import { sortItems } from '../utils/utils';

/**
 * 楽天とYahoo!の商品検索を行い、検索結果をマージして返却する
 * @param params
 * @returns
 */
export async function fetchResult(params: any): Promise<SearchResult> {
  return await Promise.all([fetchRakutenItems(params), fetchYahooItems(params)]).then((result) => {
    const rakutenResult: apiResult = result[0];
    const yahooResult: apiResult = result[1];

    // yahooは1000件以降のデータが検索できない。
    const MAX_PAGE = Math.floor((1000 - Consts.ITEM_COUNT_PER_PAGE) / Consts.ITEM_COUNT_PER_PAGE);
    const tmpMaxPage = Math.ceil((rakutenResult.allPages + yahooResult.allPages) / 2);

    const countPerPage = Consts.ITEM_COUNT_PER_PAGE * 2;
    const allCount = rakutenResult.count + yahooResult.count;
    const allPage = tmpMaxPage > MAX_PAGE ? MAX_PAGE : tmpMaxPage;
    const currentPage = Math.ceil((rakutenResult.currentPage + yahooResult.currentPage) / 2) - 1;
    const startCount = currentPage * countPerPage + 1;
    const endCountTmp = startCount + countPerPage - 1;
    const endCount = endCountTmp < allCount ? endCountTmp : allCount;

    const res: SearchResult = {
      allCount: allCount,
      startCount: startCount,
      endCount: endCount,
      allPage: allPage,
      currentPage: currentPage,
      items: sortItems([...rakutenResult.items, ...yahooResult.items], params.sort),
    };
    return res;
  });
}

/**
 * 楽天商品検索APIを実行して（）の形で返却する
 * @param params
 */
async function fetchRakutenItems(params: any): Promise<apiResult> {
  const url: URL = generateRakutenURL(params);
  // 参考：https://webservice.rakuten.co.jp/documentation/ichiba-item-search
  const res = await fetch(url.toString());

  if (res.status !== 200) {
    console.log('楽天：検索に失敗もしくは対象なし');
    return {
      count: 0,
      allPages: 0,
      currentPage: 0,
      items: [],
    };
  }
  const rate = params.rakutenRate;
  const data = await res.json();
  const items = generateRakutenItems(data, rate);

  const result: apiResult = {
    count: data.count,
    allPages: data.pageCount,
    currentPage: data.page,
    items: items,
  };

  return result;
}
function generateRakutenItems(data: any, rate: number = 1) {
  const result: Item[] = [];

  data.Items.forEach((el: any) => {
    const eachItem = el.Item;
    const imageUrl =
      eachItem.imageFlag === 1 ? eachItem.mediumImageUrls[0].imageUrl : '/images/no_image.png';
    const point = Math.floor(eachItem.pointRate * 0.01 * rate * eachItem.itemPrice);
    const totalPrice = eachItem.itemPrice + point;

    const item: Item = {
      site: '/images/rakuten_icon.png',
      name: eachItem.itemName,
      itemUrl: eachItem.itemUrl,
      price: eachItem.itemPrice,
      point: point,
      imageUrl: imageUrl,
      totalPrice: totalPrice,
    };

    result.push(item);
  });
  return result;
}

/**
 * Yahoo!ショッピング商品検索APIを実行して（）の形で返却する
 * @param params
 */
async function fetchYahooItems(params: any): Promise<apiResult> {
  const url: URL = generateYahooURL(params);
  const res = await fetch(url.toString());

  if (res.status !== 200) {
    console.log('Yahoo!：検索に失敗もしくは対象なし');
    console.log(res);
    return {
      count: 0,
      allPages: 0,
      currentPage: 0,
      items: [],
    };
  }
  const data = await res.json();
  const items = generateYahooItems(data);
  const result: apiResult = {
    count: data.totalResultsAvailable,
    allPages: Math.ceil(data.totalResultsAvailable / Consts.ITEM_COUNT_PER_PAGE),
    currentPage: Math.ceil(data.firstResultsPosition / Consts.ITEM_COUNT_PER_PAGE),
    items: items,
  };

  // 参考：https://developer.yahoo.co.jp/webapi/shopping/shopping/v3/itemsearch.html
  return result;
}

function generateYahooItems(data: any) {
  const result: Item[] = [];
  data.hits.forEach((hit: any) => {
    const item: Item = {
      site: '/images/yahoo_icon.png',
      name: hit.name,
      itemUrl: hit.url,
      price: hit.price,
      point: hit.point.bonusAmount,
      imageUrl: hit.image.medium,
      totalPrice: hit.price + hit.point.bonusAmount,
    };

    result.push(item);
  });
  return result;
}
/**
 * 楽天商品検索APIのURLを組み立てる
 * @param params
 * @returns
 */
function generateRakutenURL(params: any) {
  const url: URL = new URL(process.env.RAKUTEN_API || '');

  const sort = params.sort || 0;
  const maxPrice = params.maxPrice || Consts.RAKUTEN_MAX_PRICE;
  const minPrice = params.minPrice || Consts.RAKUTEN_MIN_PRICE;
  const pager = params.pager || 1;

  // 独自パラメータの設定
  const rakutenParams = {
    applicationId: process.env.RAKUTEN_API_APPLICATION_ID || '',
    hits: Consts.ITEM_COUNT_PER_PAGE.toString(),
    keyword: params.keyword,
    page: pager,
    minPrice: minPrice,
    maxPrice: maxPrice,
    sort: Consts.rakutenSortParams[sort],
  };

  const urlSearchParam: string = new URLSearchParams(rakutenParams).toString();
  url.search = urlSearchParam;
  return url;
}

/**
 * Yahoo!ショッピング商品検索APIのURLを組み立てる
 * @param params
 * @returns
 */
function generateYahooURL(params: any) {
  const url: URL = new URL(process.env.YAHOO_API || '');

  const sort = params.sort || 0;
  const maxPrice = params.maxPrice || Consts.YAHOO_MAX_PRICE;
  const minPrice = params.minPrice || Consts.YAHOO_MIN_PRICE;
  const pager = params.pager || 1;

  const yahooPage = (pager - 1) * Consts.ITEM_COUNT_PER_PAGE + 1;

  // 独自パラメータの設定
  const yahooParams = {
    appid: process.env.YAHOO_API_APPLICATION_ID || '',
    query: params.keyword,
    results: Consts.ITEM_COUNT_PER_PAGE.toString(),
    price_from: minPrice,
    price_to: maxPrice,
    start: yahooPage.toString(),
    sort: Consts.yahooSortParams[sort],
  };
  const urlSearchParam: string = new URLSearchParams(yahooParams).toString();
  url.search = urlSearchParam;

  return url;
}
