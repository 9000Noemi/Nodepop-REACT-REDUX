import { useEffect, useState } from 'react';
import { getAdvertList } from './service-adverts';
import { Advert } from './types';

//Listado de anuncios

function AdvertsPage() {
  /*
    Hacer la llamada a la api, esperar la respuesta, recoger esos
    datos y modificar el estado del componente para que se repinte
    */

  /*Crear un estado donde meteremos los anuncios
    Inicializamos useState con un array vacio porque su respuesta es un array*/
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    //llamada a la funcion getAdvertList() creada en service
    getAdvertList().then((response) => {
      setAdverts(response);
    });
  }, []);

  return (
    <div>
      <h1>Adverts Page</h1>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>{advert.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdvertsPage;
