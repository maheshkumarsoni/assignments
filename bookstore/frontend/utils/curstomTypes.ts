export interface Book {
  id: number;
  title: string;
  description: string;
  discount_rate: number;
  cover_image: any;
  price: number;
}

export interface ApiQuery {
  page: number;
  limit: number;
}
