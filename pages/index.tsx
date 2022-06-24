import styles from '../styles/Home.module.css';
import Layout from '../components/molecules/Layout';
import { useRouter } from 'next/router';
import InputText from '../components/atoms/InputText';
import { useState } from 'react';
import Button from '../components/atoms/Button';

export default function Index(props: any) {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>(props.keyword);

  function clickButton() {
    if (!keyword) {
      alert('キーワード必須'); //TODO:ダサい
      return;
    }

    router.push({
      pathname: '/posts/search',
      query: {
        keyword: keyword,
        pager: 1,
      },
    });
  }
  return (
    <Layout>
      <div className={styles.container}>
        <main>
          <h1 className="title">商品検索</h1>
        </main>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">
            キーワード
          </span>
          <InputText value={keyword} setValue={setKeyword} />
          <Button label="検索" onClick={clickButton} />
        </div>
      </div>
    </Layout>
  );
}
