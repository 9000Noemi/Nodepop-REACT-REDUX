import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../components/shared/Button';
import { NewAdvert } from './types';
import FormField from '../../components/shared/FormField';
import Page from '../../components/layout/Page';
import { useAppDispatch, useAppSelector } from '../../store';
import { advertsCreate, tagsLoaded } from '../../store/actions';
import './NewAdvertPage.css';

function NewAdvertPageForm() {
  const [advert, setAdvert] = useState<NewAdvert>({
    name: '',
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });

  // Obtener las tags del estado global
  const tagsArray = useAppSelector((state) => state.tags);

  const dispatch = useAppDispatch(); //Para Redux

  /*Ejecutar una función asíncrona (fetchTags) cuando el componente se monta ([] como dependencia
     significa que solo se ejecuta una vez)*/

  useEffect(() => {
    //fetchTags obtiene datos llamando a getTags(), que devuelve la lista de tags
    const fetchTags = async () => {
      // Despachar la acción de tagsLoaded con la lista de tags obtenida
      dispatch(tagsLoaded());
    };

    fetchTags();
  }, [dispatch]);

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

    //Redux: Despachar la acción de crear un anuncio a la que le pasamos el anuncio que acabamos de crear
    dispatch(advertsCreate(formData));
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
          {tagsArray?.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                name="tags"
                value={tag}
                checked={advert.tags.includes(tag)}
                onChange={handleChange}
              />
              {tag}
            </label>
          ))}
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
