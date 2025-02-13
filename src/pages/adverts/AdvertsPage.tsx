import { useEffect, useState } from 'react';
import { getAdvertList } from './service-adverts';
import type { Advert } from './types';
import Button from '../../components/shared/Button';
import AdvertItem from './Advert';
import { Link } from 'react-router-dom';
import './AdvertsPage.css';

//Listado de anuncios

const EmptyList = () => (
  <div className="advertsPage-empty">
    <p>No adverts at the moment</p>

    <Link to={'/advert/new'}>
      <Button>Create advert</Button>
    </Link>
  </div>
);

function AdvertsPage() {
  /*
Llamada a la api, esperar respuesta, recoger datos y modificar estado del componente para que se repinte
*/

  //Estado donde meter los anuncios: iniciar useState con un array vacio porque su respuesta es un array
  const [adverts, setAdverts] = useState<Advert[]>([]);

  //Cuando el componente AdvertsPage se monta, ejecuta el useEffect
  useEffect(() => {
    getAdvertList().then((response) => {
      setAdverts(response);
    });
  }, []);

  //Renderizado del componente
  return (
    <div className="advertsPage">
      <h1>Adverts Page</h1>
      {adverts.length ? (
        <ul>
          {adverts.map((advert) => (
            <li key={advert.id}>
              <Link to={`/adverts/${advert.id}`}>
                <AdvertItem advert={advert} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export default AdvertsPage;
