//import Photo from "./Photo";
//import "../css/Ad.css";
import type { Advert } from './types';

interface Props {
  advert: Advert;
}

const AdvertItem = ({ advert }: Props) => {
  const { name, sale, price, tags, photo, id } = advert;
  return (
    <div className="advert-container" key={id}>
      <a href={`http://localhost:3000/adverts/${id}`}>
        <p className="ad-name">{name}</p>
      </a>
      {/*{photo && (
        <Photo src={http://localhost:3001${photo}} alt={name} height="300" width="300" />
      )}*/}
      <span className="separator"></span>
      <p className="ad-price">{price}</p>
      <p className="ad-sale">{sale ? 'sell' : 'buy'}</p>
      <p className="ad-tags">{tags.join(', ')}</p>
    </div>
  );
};

export default AdvertItem;
