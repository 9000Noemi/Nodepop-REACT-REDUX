  import { ChangeEvent, useState } from 'react';
  import Button from '../../components/shared/Button';
  import { createAdvert } from './service-adverts';
  import { useNavigate } from 'react-router-dom';
  import { NewAdvert } from './types';
  import { isApiClientError } from '../../api/client';
  import FormField from '../../components/shared/FormField';
  import Page from '../../components/layout/Page';
  import './NewAdvertPage.css';

  function NewAdvertPageForm() {
    const [advert, setAdvert] = useState<NewAdvert>({
      name: '',
      sale: true,
      price: 0,
      tags: [],
      photo: null,
    });

    const navigate = useNavigate();

    //Gestionar el envío del formulario
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      //Evita que la página se recargue al enviar el formulario.
      event.preventDefault();

      //Crea un objeto FormData que contiene todos los datos del formulario para enviarse al servidor
      const formData = new FormData();
      formData.append('name', advert.name);
      formData.append('sale', String(advert.sale));
      formData.append('price', String(advert.price));
      formData.append('tags', advert.tags.join(','));
      if (advert.photo) {
        formData.append('photo', advert.photo);
      }
      try {
        //Llamada a la función createAdvert
        const createdAdvert = await createAdvert(formData);
        //Si se crea el anuncio redirige a la pagina del detalle del mismo
        navigate(`/adverts/${createdAdvert.id}`);
        //Si ocurre un error:
      } catch (error) {
        if (isApiClientError(error)) {
          if (error.code === 'UNAUTHORIZED') {
            navigate('/login');
          }
        }
        console.log(error);
      }
    };

    // Gestionar cambios en los campos del formulario: actualizar el estado con los inputs
    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      //Extraer los datos del evento
      const { name, value, type, files, checked } =
        event.target as HTMLInputElement;

      //Actualizar el estado
      setAdvert((prevAdvert) => {
        if (type === 'file' && files) {
          return { ...prevAdvert, photo: files[0] };
        }

        if (type === 'checkbox') {
          const newTags = checked
            ? [...prevAdvert.tags, value]
            : prevAdvert.tags.filter((tag) => tag !== value);
          return { ...prevAdvert, tags: newTags };
        }

        return {
          ...prevAdvert,
          [name]: name === 'sale' ? value === 'true' : value,
        };
      });
    };

    // Deshabilitar el botón si falta algún campo obligatorio
    const { name, price, tags } = advert;
    const isDisabled = !name || price <= 0 || tags.length === 0;

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

          <Button
            className="button"
            type="submit"
            variant="primary"
            disabled={isDisabled}
          >
            Create Advert
          </Button>
        </form>
      </Page>
    );
  }

  export default NewAdvertPageForm;
