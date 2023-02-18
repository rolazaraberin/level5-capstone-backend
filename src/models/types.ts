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
  items?: Item[];
}

export interface Item {
  id: number;
  itemID?: number;
  name?: string;
  description?: string;
  price?: number;
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  token?: string;
  password?: string;
  cartID: number;
}
