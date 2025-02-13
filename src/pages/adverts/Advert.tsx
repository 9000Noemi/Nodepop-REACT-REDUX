import type { Advert } from './types';
import './Advert.css';

/*Componente que recibe datos de un objeto Advert como props y 
muestra un anuncio en el listado de AdvertsPage*/

const AdvertItem = ({ name, sale, price, tags, id }: Advert) => {
  
  return (
    <div className="advert-container" key={id}>
      <a href={`/adverts/${id}`}>
        <p className="ad-name">{name}</p>
      </a>
  
      <span className="separator"></span>
      <p className="ad-price">{price}</p>
      <p className="ad-sale">{sale ? 'sell' : 'buy'}</p>
      <p className="ad-tags">{tags.join(', ')}</p>
    </div>
  );
};

export default AdvertItem;
