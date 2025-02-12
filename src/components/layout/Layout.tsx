import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

//ReactNode es un tipo que representa cualquier contenido que se puede renderizar en React

interface Props {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: Props) {
  //REVISAR TITLE, LO PONGO POR ADVERTPAGE
  return (
    <div className="layout">
      <Header
        onLogout={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
