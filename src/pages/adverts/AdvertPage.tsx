import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Advert } from './types';
import { getAdvert } from './service-adverts';
import { isApiClientError } from '../../api/client';
import Page from '../../components/layout/Page';
import './AdvertPage.css';

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);

  useEffect(() => {
    if (params.advertId) {
      getAdvert(params.advertId)
        .then((advert) => setAdvert(advert))
        .catch((error) => {
          if (isApiClientError(error)) {
            if (error.code === 'NOT_FOUND') {
              navigate('/404');
            }
          }
        });
    }
  }, [params.advertId, navigate]);

  return (
    <Page title="Advert Detail">
      {/*Si advert está disponible, renderiza sus detalles; si no, muestra un mensaje de carga*/}
      {advert ? (
        <div className="advert-details">
          <h2>{advert.name}</h2>

          {/*Renderiza la imagen solo si advert.photo existe*/}
          {advert.photo && <img src={advert.photo} alt={advert.name} />}

          <p>
            <strong>Price:</strong> {advert.price} €
          </p>
          <p>
            <strong>Type:</strong> {advert.sale ? 'SALE' : 'BUY'}
          </p>
          <p>
            <strong>Tags:</strong> {advert.tags.join(', ')}
          </p>
        </div>
      ) : (
        <p>Loading advert details...</p>
      )}
    </Page>
  );
}
export default AdvertPage;
