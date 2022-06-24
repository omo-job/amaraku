import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/molecules/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { fetchResult } from '../../service/searchItemService';
import { Item } from '../../type/Item.type';
import { SearchResult } from '../../type/SearchResult.type';
import Pagination from '../../components/atoms/Pagination';
import { getSearchOrder } from '../../utils/utils';
import Button from '../../components/atoms/Button';
import InputText from '../../components/atoms/InputText';
import MyNumber from '../../components/atoms/MyNumber';
import Select from '../../components/atoms/Select';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 共通パラメータ
  const keyword = context.query.keyword;
  const sort = context.query.sort as string;
  const maxPrice = context.query.upper;
  const minPrice = context.query.lower;
  const pager = context.query.pager;

  const params = {
    keyword: keyword,
    sort: getSearchOrder(sort),
    maxPrice: maxPrice,
    minPrice: minPrice,
    pager: pager,
  };
  const result: SearchResult = await fetchResult(params);
  return {
    props: {
      items: result.items,
      keyword: keyword,
      result: result,
    },
  };
};

export default function Search(props: any) {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>(props.keyword);
  const [order, setOrder] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  // TODO:これダサい
  const options = [
    {
      id: 0,
      value: '価格昇順',
    },
    {
      id: 1,
      value: '価格降順',
    },
    {
      id: 2,
      value: 'ポイント込昇順',
    },
    {
      id: 3,
      value: 'ポイント込降順',
    },
  ];

  function clickButton(page: number) {
    if (!keyword) {
      alert('検索条件を入力してね'); //TODO:ダサい
      return;
    }

    router.push({
      pathname: '/posts/search',
      query: {
        keyword: keyword,
        pager: page,
        upper: maxPrice,
        lower: minPrice,
        sort: order,
      },
    });
    return;
  }

  return (
    <>
      <Layout>
        <div>
          <h1>検索結果</h1>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              キーワード
            </span>
            <InputText value={keyword} setValue={setKeyword} />
            <Button label="検索" onClick={() => clickButton(1)} />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon4">
              商品価格
            </span>
            <MyNumber value={minPrice} setValue={setMinPrice} min={0} max={999999999} />
            <span>{' − '}</span>
            <MyNumber value={maxPrice} setValue={setMaxPrice} min={0} max={999999999} />
            <Select value="default value" optionProp={options} setValue={setOrder} />
          </div>
          <label>
            検索結果 {props.result.allCount} のうち {props.result.startCount} -{' '}
            {props.result.endCount} 件
          </label>

          <div className="container">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>商品名</th>
                  <th>価格</th>
                  <th>ポイント</th>
                  <th>価格＋ポイント</th>
                  <th>画像イメージ</th>
                </tr>
              </thead>
              <tbody>
                {props.items.map((el: Item, index: number) => (
                  <tr key={index}>
                    <td>
                      <Image src={el.site} width={128} height={128} />
                    </td>
                    <td>
                      <Link href={el.itemUrl}>
                        <a target="_blank">{el.name}</a>
                      </Link>
                    </td>
                    <td>{el.price}</td>
                    <td>{el.point}</td>
                    <td>{el.totalPrice}</td>
                    <td>
                      <Image src={el.imageUrl} width={128} height={128} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              pageCount={props.result.allPage}
              handleSearchItem={clickButton}
              currentPage={props.result.currentPage}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
