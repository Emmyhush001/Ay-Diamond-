import { Category, type Product, type Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Diamond Signature Strawberries & Cream',
    description: 'A luxurious three-tier strawberry cream cake with gold leaf decorations and fresh organic berries.',
    price: 25000,
    category: Category.CAKES,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    ingredients: ['Madagascar Vanilla', 'Fresh Strawberries', 'Organic Cream', 'Gold Leaf'],
    sizes: ['Small (6")', 'Medium (8")', 'Large (10")'],
    nutrition: { calories: 450, fat: '15g', sugar: '32g', protein: '5g' }
  },
  {
    id: '2',
    name: 'Vanilla Gold Bean Gelato',
    description: 'Creamy, small-batch gelato infused with premium Madagascar vanilla beans.',
    price: 3500,
    category: Category.ICE_CREAM,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    ingredients: ['Grade A Vanilla Beans', 'Fresh Whole Milk', 'Heavy Cream'],
    flavors: ['Classic Vanilla', 'French Vanilla', 'Smoked Vanilla'],
    sizes: ['Single Scoop', 'Double Scoop', 'Pint'],
    nutrition: { calories: 250, fat: '12g', sugar: '20g', protein: '4g' }
  },
  {
    id: '3',
    name: 'Velvet Chocolate Glaze Doughnut',
    description: 'Hand-crafted brioche doughnut dipped in 70% dark Belgian chocolate and sprinkled with gold dust.',
    price: 1800,
    category: Category.DOUGHNUTS,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Belgian Chocolate', 'Brioche Dough', 'Edible Gold Dust'],
    isLimited: true,
    nutrition: { calories: 380, fat: '18g', sugar: '25g', protein: '6g' }
  },
  {
    id: '4',
    name: 'Caramel Bliss Milkshake',
    description: 'Ultra-creamy milkshake with salted caramel swirls, topped with whipped cream and a diamond-cut caramel shard.',
    price: 5500,
    category: Category.MILKSHAKES,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    ingredients: ['House-made Salted Caramel', 'Vanilla Ice Cream', 'Whole Milk'],
    flavors: ['Classic Caramel', 'Salted Caramel', 'Burnt Caramel'],
    nutrition: { calories: 650, fat: '25g', sugar: '55g', protein: '8g' }
  },
  {
    id: '5',
    name: 'Pistachio Dream Cupcake',
    description: 'Light pistachio sponge topped with a silky pistachio buttercream and crushed premium nuts.',
    price: 2200,
    category: Category.CUPCAKES,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Persian Pistachios', 'Cake Flour', 'Unsalted Butter'],
    nutrition: { calories: 320, fat: '14g', sugar: '28g', protein: '4g' }
  },
  {
    id: '6',
    name: 'Royal Red Velvet Cake',
    description: 'Deep crimson cocoa sponge layered with Madagascar vanilla cream cheese frosting and silver pearls.',
    price: 28000,
    category: Category.CAKES,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324671ff6?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    ingredients: ['Premium Cocoa', 'Cream Cheese', 'Buttermilk', 'Silver Pearls'],
    sizes: ['Small (6")', 'Medium (8")', 'Large (10")'],
    nutrition: { calories: 520, fat: '22g', sugar: '45g', protein: '6g' }
  },
  {
    id: '7',
    name: 'Midnight Chocolate Fudge',
    description: 'Intense 70% dark chocolate cake with layers of ganache and a hint of espresso.',
    price: 30000,
    category: Category.CAKES,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Belgian Dark Chocolate', 'Espresso', 'Heavy Cream'],
    sizes: ['Small (6")', 'Medium (8")', 'Large (10")'],
    nutrition: { calories: 580, fat: '35g', sugar: '38g', protein: '7g' }
  },
  {
    id: '8',
    name: 'Artisan Butter Croissant',
    description: 'Flaky, 24-layer French butter croissant with a golden crust and airy interior.',
    price: 1500,
    category: Category.PASTRIES,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    ingredients: ['French Butter', 'High-protein Flour', 'Yeast'],
    nutrition: { calories: 280, fat: '16g', sugar: '5g', protein: '6g' }
  },
  {
    id: '9',
    name: 'Pain au Chocolat',
    description: 'Classic French pastry filled with two batons of premium semi-sweet dark chocolate.',
    price: 1800,
    category: Category.PASTRIES,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=800',
    ingredients: ['French Butter', 'Dark Chocolate', 'French Flour'],
    nutrition: { calories: 340, fat: '20g', sugar: '12g', protein: '7g' }
  },
  {
    id: '10',
    name: 'Triple Chocolate Cookie',
    description: 'Soft, chewy cookie loaded with white, milk, and dark chocolate chunks, finished with sea salt.',
    price: 1200,
    category: Category.COOKIES,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    ingredients: ['White Chocolate', 'Milk Chocolate', 'Dark Chocolate', 'Sea Salt'],
    nutrition: { calories: 220, fat: '12g', sugar: '18g', protein: '3g' }
  },
  {
    id: '11',
    name: 'Sea Salt Caramel Cookie',
    description: 'Buttery cookie with pools of melted caramel and a generous sprinkle of Maldon sea salt.',
    price: 1200,
    category: Category.COOKIES,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
    ingredients: ['House-made Caramel', 'Brown Butter', 'Maldon Sea Salt'],
    nutrition: { calories: 240, fat: '14g', sugar: '20g', protein: '3g' }
  },
  {
    id: '12',
    name: 'Belgian Dark Chocolate Ice Cream',
    description: 'Velvety ice cream made with real Belgian cocoa and chocolate flecks.',
    price: 3500,
    category: Category.ICE_CREAM,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Belgian Cocoa', 'Whole Milk', 'Chocolate Chips'],
    flavors: ['Classic Dark', 'Mint Dark', 'Orange Dark'],
    sizes: ['Single Scoop', 'Double Scoop', 'Pint'],
    nutrition: { calories: 310, fat: '18g', sugar: '24g', protein: '5g' }
  },
  {
    id: '13',
    name: 'Strawberry Cheesecake Ice Cream',
    description: 'Creamy cheesecake-flavored ice cream with graham cracker swirls and fresh strawberry bits.',
    price: 4000,
    category: Category.ICE_CREAM,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800',
    ingredients: ['Cream Cheese', 'Fresh Strawberries', 'Graham Crackers'],
    sizes: ['Single Scoop', 'Double Scoop', 'Pint'],
    nutrition: { calories: 340, fat: '20g', sugar: '28g', protein: '6g' }
  },
  {
    id: '14',
    name: 'Ultimate Birthday Celebration Box',
    description: 'A curated selection of our finest desserts: 4 cupcakes, 4 doughnuts, and 4 premium cookies.',
    price: 15000,
    category: Category.BIRTHDAY_SPECIALS,
    image: 'https://images.unsplash.com/photo-1530131211123-fdf9767694c0?auto=format&fit=crop&q=80&w=800',
    isLimited: true,
    ingredients: ['Assorted Premium Desserts'],
    nutrition: { calories: 1200, fat: '60g', sugar: '140g', protein: '15g' }
  },
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'Chioma A.',
    rating: 5,
    comment: 'The Diamond Signature cake was the highlight of my birthday. So soft and elegant!',
    date: '2024-03-15',
  },
  {
    id: '2',
    userName: 'David O.',
    rating: 5,
    comment: 'Best gelato in Nigeria, hands down. The vanilla gold is purely addictive.',
    date: '2024-03-10',
  },
  {
    id: '3',
    userName: 'Sarah J.',
    rating: 5,
    comment: 'The packaging itself feels like a luxury gift. The doughnuts are unreal.',
    date: '2024-04-02',
  },
  {
    id: '4',
    userName: 'Emeka U.',
    rating: 5,
    comment: 'Ordered for a corporate event and everyone was blown away. Absolute diamond standards.',
    date: '2024-04-10',
  },
];
