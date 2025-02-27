export type Bicycle = {
    _id: string;
    name: string;
    brand: string;
    price: number;
    type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
    description: string;
    quantity: number;
    inStock?: boolean;
    photos: [{
      url: string;
      publicId: string;
    }]; // Array to store multiple image URLs (max 5)
  };

  export type Order = {
    _id: string;
    email: string;
    transactionID: string;
    product: Bicycle[];
    quantity: number;
    totalPrice: number;
    status: "pending" | "completed" | "cancelled" ;
    paymentStatus: "success" | "cancelled" | "failed";
  };
  
  