export interface User {
  name: string;
  email: string;
  password: string;
  id: string;
  role: "user" | "admin";
  address: {
    line1: string | null;
    line2: string | null;
  };
  phone: number | null;
  createdAt: string |null;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "esewa" | "cod";
  shippingAddress: {
    name: string;
    phone: number;
    address: {
      line1: string;
      line2: string;
    };
  };
  createdAt: string;
}


export const users:User[]=[
    {
    id: '1',
    email: 'admin@onlinepasal.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
    address:{
        line1:null,
        line2:null
    },
    phone:null
  },
  {
    id: '2',
    email: 'sujit@gmail.com',
    password: 'sujitsujit',
    name: 'Sujit Barnawal',
    role: 'user',
    createdAt: new Date().toISOString(),
    address:{
        line1:'Tangal,Kathmandu',
        line2:'Bagmati'
    },
    phone:9863404921
  },
]


export const products:Product[] =[
    {
        id: '1',
        title: "Classic White Sneakers",
        price: 8500,
        description: "Minimalist leather sneakers perfect for everyday wear.",
        category: "men's clothing",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400",
        rating: { rate: 4.5, count: 120 }
    },
    {
        id: '2',
        title: "Gold Petite Ring",
        price: 1500,
        description: "14k solid gold ring with a delicate polished finish.",
        category: "jewellery",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400",
        rating: { rate: 4.8, count: 45 }
    },
    {
        id: '3',
        title: "Wireless Noise Cancelling Headphones",
        price: 2990,
        description: "Premium sound quality with active noise cancellation features.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
        rating: { rate: 4.7, count: 890 }
    },
    {
        id: '4',
        title: "Summer Floral Dress",
        price: 4599,
        description: "Lightweight breathable cotton dress for sunny days.",
        category: "women's clothing",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400",
        rating: { rate: 4.2, count: 210 }
    },
    {
        id: '5',
        title: "Minimalist Desk Lamp",
        price: 3550,
        description: "Adjustable LED lamp with three color modes.",
        category: "others",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400",
        rating: { rate: 4.4, count: 75 }
    }
]


export const cartItems:CartItem[]=[]
export const orders:Order[]=[]