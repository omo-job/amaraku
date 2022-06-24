import { ReactElement } from 'react';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header></Header>
      <div className="container">{children}</div>
      <Footer></Footer>
    </>
  );
}
