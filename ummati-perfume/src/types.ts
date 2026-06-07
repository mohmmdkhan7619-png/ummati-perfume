export type CategoryType =
  | 'All'
  | 'Perfumes'
  | 'Attars'
  | 'Bakhoor'
  | 'Bakhoor Burners'
  | 'Islamic Gifts'
  | 'Prayer Mats'
  | 'Tasbeeh'
  | 'Islamic Accessories';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  scentProfile?: string; // e.g. "Oud, Amber, Woody"
  description: string;
  sizes?: string[]; // e.g. ["50ml", "100ml"]
  notes?: {
    top: string;
    heart: string;
    base: string;
  };
  features?: string[]; // e.g. ["Long-lasting 12h+", "Alcohol-free", "Premium Quality"]
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    size: string;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: 'COD' | 'Card' | 'WhatsApp';
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  productName?: string;
}
