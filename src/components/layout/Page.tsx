import type { ReactNode } from 'react';
import './Layout.css';

//Particularizar cada una de las paginas

interface Props {
  title: string;
  children: ReactNode;
}

export default function Page({ title, children }: Props) {
  return (
    <div className="layout-page">
      <h2 className="layout-title">{title}</h2>
      {children}
    </div>
  );
}
