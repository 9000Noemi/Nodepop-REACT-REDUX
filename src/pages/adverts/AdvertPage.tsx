import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Advert } from './types';
import { deleteAdvert, getAdvert } from './service-adverts';
import { isApiClientError } from '../../api/client';
import Page from '../../components/layout/Page';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog'; 
import './AdvertPage.css';

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
   // Estado para mostrar el mensaje de confirmacion
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Estado para manejar el estado de carga (si es necesario)
  const [loading, setLoading] = useState(false);

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

  
  const handleDelete = async () => {
    if (advert && params.advertId) {
      setLoading(true);
      try {
        await deleteAdvert(params.advertId);
        navigate('/adverts');
      } catch (error) {
        console.log('Error deleting advert:', error);
      } finally {
        setLoading(false);
        setShowConfirmation(false);
      }
    }
  };

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleCancelDelete = () => setShowConfirmation(false);


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
          <button onClick={handleShowConfirmation}>Delete Advert</button>

        {showConfirmation && (
          <ConfirmationDialog
            message="Are you sure you want to delete this advert?"
            onConfirm={handleDelete}
            onCancel={handleCancelDelete}
            loading={loading}
          />
  )}
  </div>
  ) : (
  <p>Loading advert details...</p>
  )}
      </Page>
    );
  }
export default AdvertPage;
