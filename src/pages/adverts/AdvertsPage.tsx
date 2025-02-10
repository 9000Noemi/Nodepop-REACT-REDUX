import { useEffect, useState } from 'react';
import { getAdvertList } from './service-adverts';
import { Advert } from './types';
import { logout } from '../auth/service-auth';
import Button from '../../components/shared/Button';

//Listado de anuncios

interface Props {
  onLogout: () => void
}

function AdvertsPage( { onLogout }: Props) {
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

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  //Renderizado del componente
  return (
    <div>
      <h1>Adverts Page</h1>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>{advert.name}</li>
        ))}
      </ul>

      <Button onClick= {handleLogoutClick}>Logout</Button>

    </div>
  );
}

export default AdvertsPage;
