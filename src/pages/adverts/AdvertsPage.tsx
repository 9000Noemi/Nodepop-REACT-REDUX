import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../components/shared/Button';
import { Link } from 'react-router-dom';
import Page from '../../components/layout/Page';
import FormField from '../../components/shared/FormField';
import AdvertItem from './Advert';
import type { Advert } from './types';
import './AdvertsPage.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { advertsLoaded } from '../../store/actions';
import { selectAdverts  } from '../../store/selectors';

//Listado de anuncios

const EmptyList = () => (
  <div className="advertsPage-empty">
    <p>No adverts at the moment</p>

    <Link to="/adverts/new">
      <Button>Create advert</Button>
    </Link>
  </div>
);

function AdvertsPage() {

  // Conectar con el estado de Redux para obtener los anuncios
  const adverts = useAppSelector(selectAdverts);
  const dispatch = useAppDispatch();

  //Estados para filtros de name y all, sell o buy
  const [nameToFilter, setNameToFilter] = useState('');
  const [saleToFilter, setSaleToFilter] = useState('all');

  //Cuando el componente AdvertsPage se monta, ejecuta el useEffect
  useEffect(() => {
      dispatch(advertsLoaded());  // Despachamos los anuncios cargados a Redux
  }, [dispatch]);

  //Para el filtro por nombre
  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setNameToFilter(event.target.value);
  };
  //Para el filtro de sale/buy
  const handleRadio = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSaleToFilter(event.target.value);
  };

  //Si advert.name incluye el texto del input
  const nameFilter = (advert: Advert) => {
    return advert.name.toLowerCase().includes(nameToFilter.toLowerCase());
  };

  //Si advert.sale es true: sell, si no: buy. Por defecto es all, asi que si no cambia muestra all
  const saleFilter = (advert: Advert) => {
    const sellBuy = advert.sale ? 'sell' : 'buy';
    return saleToFilter === 'all' || saleToFilter === sellBuy;
  };
  const filteredAdverts =
    adverts?.filter((advert: Advert) => {
      return nameFilter(advert) && saleFilter(advert);
    }) || [];

  //Renderizado del componente
  return (
    <Page title="Advert List">
      <FormField
        type="text"
        name="query"
        onChange={handleSearch}
        label={'Filter by name'}
      ></FormField>

      <div className="filter-section">
        <p>Filter by sale type:</p>

        <label>
          <input type="radio" name="sale" value="sell" onChange={handleRadio} />
          Sell
        </label>

        <label>
          <input type="radio" name="sale" value="buy" onChange={handleRadio} />
          Buy
        </label>

        <label>
          <input type="radio" name="sale" value="all" onChange={handleRadio} />
          All
        </label>
      </div>

      <div className="advertsPage">
        {filteredAdverts.length !== 0 ? (
          <div className="adsList">
            {filteredAdverts.map((advert) => (
              <AdvertItem {...advert} />
            ))}
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
