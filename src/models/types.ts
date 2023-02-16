export interface AuthData {
  email?: string;
  isTemporary?: boolean;
  token?: string;
}

export interface Cart {
  id: number;
  itemsTable: string;
  totalQuantity?: number;
  totalPrice?: number;
}

export interface User {
  id: number;
  email: string;
  token: string;
  password: string;
  cartID: number;
}
