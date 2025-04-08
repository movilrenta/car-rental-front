export type Carousel_Type = {
  id: number;
  name: string;
  location: string;
  images: {
    id: number;
    carousel_id: number;
    path: string;
    title: string;
    description: string;
    link: string;
    order: number;
  }[];
}