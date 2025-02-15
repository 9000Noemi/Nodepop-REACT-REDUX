export interface Advert {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: string;
  id: number;
}

//Nueva interfaz excluyendo el id:
export interface NewAdvert {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: File | null;
}
