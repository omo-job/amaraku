// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchResult } from '../../service/searchItemService';
import { SearchResult } from '../../type/SearchResult.type';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = {
    keyword: req.query.keyword,
    rakutenRate: req.query.rakutenRate,
    sort: req.query.searchOrderBy,
    maxPrice: req.query.maxPrice,
    minPrice: req.query.minPrice,
    pager: req.query.pager,
  };

  const result: SearchResult = await fetchResult(params);
  res.status(200).json({name: 'hoge'});
}
