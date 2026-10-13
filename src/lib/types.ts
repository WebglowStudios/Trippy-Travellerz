export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  wishlist: string[];
  isVerified: boolean;
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
  errors?: { field: string; message: string }[];
}
