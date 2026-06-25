export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in XAF/FCFA
  image: string;
  status: 'In Stock' | 'Limited' | 'Almost Out' | 'Out';
  shopId: string;
}

export interface Shop {
  id: string;
  name: string;
  image: string;
  distance: string; // e.g., "0.8km away"
  rating?: number;
  verified: boolean;
  neighborhood: string;
  address: string;
  tags: string[];
  logoUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Collected' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string; // e.g., BM-8829
  customerName: string;
  phone: string;
  deliveryAddress: string;
  instructions: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  type: 'Delivery' | 'Pickup';
  date: string; // "2 mins ago" etc. or timestamp
  shopId: string;
  shopName: string;
  paymentMethod: 'MoMo' | 'Orange' | 'Cash';
}

export type Perspective = 'customer' | 'merchant' | 'rider';

export type CustomerScreen = 'login' | 'home' | 'store' | 'cart' | 'checkout' | 'tracking';

export type MerchantScreen = 'orders' | 'catalogue' | 'register';

export type RiderScreen = 'jobs' | 'tracking' | 'history';
