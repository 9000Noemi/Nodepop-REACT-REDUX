import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from '../../components/shared/Button';
import { createAdvert } from './service-adverts';
import { useNavigate } from 'react-router-dom';
import { NewAdvert } from './types';
import { isApiClientError } from '../../api/client';
import FormField from '../../components/shared/FormField';
import './NewAdvertPage.css';
import Page from '../../components/layout/Page';

function NewAdvertPageForm() {
  const [advert, setAdvert] = useState<NewAdvert>({
    name: '',
    sale: true,
    price: 0,
    tags: [],
    photo: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', advert.name);
    formData.append('sale', String(advert.sale));
    formData.append('price', String(advert.price));
    formData.append('tags', String(advert.tags));
    if (advert.photo) {
      formData.append('photo', advert.photo);
    }

    try {
      const createdAdvert = await createAdvert(formData);
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (isApiClientError(error)) {
        if (error.code === 'UNAUTHORIZED') {
          navigate('/login');
        }
      }
      console.log(error);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, files } = event.target as HTMLInputElement;

    setAdvert((prevAdvert) => ({
      ...prevAdvert,
      [name]:
        name === 'sale'
          ? value === 'true'
          : type === 'file' && files
            ? files[0]
            : value,
    }));
  };

  return (
    <Page title="Create your advert">
      <form className="newAdvertPage-form" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="name"
          label="Name of your item"
          className="name"
          value={advert.name}
          onChange={handleChange}
          required
        ></FormField>

        <FormField
          type="radio"
          name="sale"
          label="Sell"
          className="sale"
          value="true"
          onChange={handleChange}
          checked={advert.sale === true}
        ></FormField>

        <FormField
          type="radio"
          name="sale"
          label="Buy"
          className="sale"
          value="false"
          onChange={handleChange}
          checked={advert.sale === false}
        ></FormField>

        <FormField
          type="number"
          name="price"
          label="Price of your item"
          className="price"
          value={advert.price}
          onChange={handleChange}
          required
        ></FormField>

        <div className="formField">
          <span>Tags</span>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="lifestyle"
              checked={advert.tags.includes('lifestyle')}
              onChange={handleChange}
            />
            Lifestyle
          </label>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="mobile"
              checked={advert.tags.includes('mobile')}
              onChange={handleChange}
            />
            Mobile
          </label>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="motor"
              checked={advert.tags.includes('motor')}
              onChange={handleChange}
            />
            Motor
          </label>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="work"
              checked={advert.tags.includes('work')}
              onChange={handleChange}
            />
            Work
          </label>
        </div>

        <FormField
          type="file"
          name="photo"
          label="Photo"
          className="photo"
          onChange={handleChange}
        ></FormField>

        <Button className="button" type="submit" variant="primary">
          Create Advert
        </Button>
      </form>
    </Page>
  );
}

export default NewAdvertPageForm;
