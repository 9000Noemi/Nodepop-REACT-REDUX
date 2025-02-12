import { useParams } from 'react-router-dom';

function AdvertPage() {
  const params = useParams();
  return <div>{`Advert detail ${params.advertId} goes here...`}</div>;
}

export default AdvertPage;
