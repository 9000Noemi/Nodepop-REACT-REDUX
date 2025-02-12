import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

function AdvertPage() {
    const params = useParams();
    return (
        <Layout title="Advert detail">{`Advert detail ${params.advertId} goes here...`}</Layout>
    );
}

export default AdvertPage;
