import { ChangeEvent, useEffect, useRef, useState } from 'react';
//import Page from "../../components/layout/Page";
import Button from '../../components/shared/Button';
//import Photo from "../../components/shared/Photo";
//import "./NewAdvertPage.css";
//import Fibonacci from "../../components/Fibonacci";
import { createAdvert } from './service-adverts';
import { useNavigate } from 'react-router-dom';
import { NewAdvert } from './types';
import { isApiClientError } from '../../api/client';
import Layout from '../../components/layout/Layout';
import FormField from '../../components/shared/FormField';

function NewAdvertPageForm() {
  const [advert, setAdvert] = useState<NewAdvert>({
    name: '',
    sale: true,
    price: 0,
    tags: [''],
    photo: '',
  });

  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);
  //const textAreaRef = useRef<HTMLTextAreaElement>(null);

  /*
  useEffect(() => {
    console.log("button", buttonRef.current);
    // buttonRef.current?.focus();
    textAreaRef.current?.focus();
  }, []);
  */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(event.target);
      //const createdAdvert = await createAdvert({ event.target });
      //navigate(`/tweets/${createdTweet.id}`);
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
      [name]: type === 'file' && files ? files[0] : value,
    }));
  };

  return (
    <form className="newAdvertPage-form" onSubmit={handleSubmit}>
      <FormField
        type="text"
        name="name"
        placeholder="What do you want to sell today?"
        label="Name of your item"
        className="name"
        value={advert.name}
        onChange={handleChange}
      ></FormField>
      <FormField
        type="radio"
        name="sale"
        placeholder="Are you selling?"
        label="Sell"
        className="sale"
        value="sell"
        onChange={handleChange}
        checked={advert.sale}
      ></FormField>
      <FormField
        type="radio"
        name="sale"
        placeholder="Are you buying?"
        label="Buy"
        className="sale"
        value="buy"
        onChange={handleChange}
        checked={advert.sale}
      ></FormField>
      <FormField
        type="number"
        name="price"
        placeholder="What price do you want to set? Don't be greedy!"
        label="Price of your item"
        className="price"
        value={advert.price}
        onChange={handleChange}
      ></FormField>
      <select name="tags" className="form-select" multiple>
        {advert.tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <FormField
        type="file"
        name="photo"
        placeholder="Upload a photo of your item"
        label="Photo"
        className="photo"
        value={advert.photo}
        onChange={handleChange}
      ></FormField>
      <Button className="button" type="submit" variant="primary">
        Create Ad
      </Button>
    </form>
  );
}

export default NewAdvertPageForm;
