import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from '../../components/layout/Page';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';
import { useAppSelector, useAppDispatch } from '../../store';
import { selectAdDetail } from '../../store/selectors';
import { advertDetail, advertsDelete } from '../../store/actions';
import './AdvertPage.css';

function AdvertPage() {
  const params = useParams();
  const dispatch = useAppDispatch(); //Para Redux

  // Accedemos a los detalles del anuncio desde Redux, usamos el selector selectAdDetail
  const advert = useAppSelector(selectAdDetail);
  // Estado para mostrar el mensaje de confirmacion
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Estado para manejar el estado de carga (si es necesario)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.advertId) {
      dispatch(advertDetail(params.advertId));
    }
  }, [dispatch, params.advertId]);

  const handleDelete = async () => {
    if (advert && params.advertId) {
      setLoading(true);
      // Despachar la acción de eliminación de anuncio para actualizar el estado global
      dispatch(advertsDelete(params.advertId));

      setLoading(false);
      setShowConfirmation(false);
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
