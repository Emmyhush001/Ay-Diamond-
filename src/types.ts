export enum Category {
  CAKES = 'Cakes',
  CUPCAKES = 'Cupcakes',
  DOUGHNUTS = 'Doughnuts',
  ICE_CREAM = 'Ice Cream',
  MILKSHAKES = 'Milkshakes',
  PASTRIES = 'Pastries',
  COOKIES = 'Cookies',
  WAFFLES = 'Waffles',
  SUNDAES = 'Sundaes',
  DRINKS = 'Drinks',
  BIRTHDAY_SPECIALS = 'Birthday Specials',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isPopular?: boolean;
  isLimited?: boolean;
  ingredients: string[];
  flavors?: string[];
  sizes?: string[];
  nutrition?: {
    calories: number;
    fat: string;
    sugar: string;
    protein: string;
  };
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedFlavor?: string;
  selectedSize?: string;
}
