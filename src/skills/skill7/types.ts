interface item {
  name: string;
  price: number;
}

type items = item[];
type cart = item[];

interface payload {
  item: item;
}

interface action<Type> {
  type: string;
  payload: Type;
}
interface state {
  items: items;
  cart: cart;
  total: number;
}

export { action, cart, item, payload, state };
