import Head from 'next/head';
import Link from 'next/link';

export default function Header() {
  return (
    <>
      <Head>
        <title>Ama-Raku</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a>
          <div>Ama-Raku</div>
        </a>
      </Link>
    </>
  );
}
