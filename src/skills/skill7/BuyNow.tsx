import Layout from "components/Layout";
import { navigateTo } from "components/NavigationHooks";
import Subtitle from "components/Subtitle";
import Title from "components/Title";
import { isEqual } from "lodash";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Provider, useDispatch, useSelector } from "react-redux";
import { matchValue, reduce } from "scripts/utilityFunctions";
import { generateKey } from "scripts/utilityFunctionsReact";
import Cart from "./Cart";
import { addItem, removeItem } from "./reducer";
import { item, state } from "./types";

export default BuyNow;

function BuyNow({ editCart }: { editCart: Function }) {
  const total = useSelector(selectTotal);
  const cartItems = useSelector(selectCart);
  const [cart, setCart] = useState<ReactElement[]>();
  const [hideCart, setHideCart] = useState(true);
  const dispatch = useDispatch();
  useEffect(componentDidUpdate, [cartItems]);

  return (
    <>
      <Layout.Banner>
        <Title>Review Order</Title>
        <Subtitle>
          <Button onClick={handleEditCart}>Edit cart</Button>{" "}
          <Button onClick={handleBack}>Back</Button>
        </Subtitle>
      </Layout.Banner>
      <Layout.Content>
        <ol>
          <li>Click on "Edit Cart"</li>
          <li>Empty the cart</li>
          <li>Site gets re-routed back to shopping</li>
        </ol>
        <hr />
        <table>
          <tbody>{cart}</tbody>
        </table>
        <Button>Buy now</Button>
        <br />
        Total: ${total}.00
      </Layout.Content>
    </>
  );

  //***************************************************

  function componentDidUpdate() {
    if (cartItems.length === 0) navigateTo("/skill7");
    else {
      const _cart = reduce(cartItems, toCart);
      setCart(_cart);
    }
  }
  function handleEditCart() {
    editCart();
    // setHideCart(false);
  }
  function handleBack() {
    navigateTo("/skill7");
  }
  function toCart(
    cart: ReactElement[],
    item: { name: string; price: number },
    index: number,
    array: {}[]
  ) {
    const itemCount = array.filter(matchValue(item)).length;
    if (index > array.findIndex(matchValue(item))) return cart;
    cart.push(
      <tr className="cart-item" key={generateKey()}>
        <td>
          {item.name} ${item.price}.00
        </td>
        <td>
          {/* <ButtonGroup> */}
          {/* <Button onClick={handleRemove(item)}>-</Button> */}
          <Button variant="light">{itemCount}</Button>
          {/* <Button onClick={handleAdd(item)}>+</Button> */}
          {/* </ButtonGroup> */}
          {/* <Icon name="remove-minus" onClick={handleRemove(item)} />
            <button className="btn-outline-dark">{itemCount}</button>
            <Icon name="add-plus" onClick={handleAdd(item)} /> */}
        </td>
      </tr>
    );
    return cart;
  }
}

function selectCart(state: state) {
  return state.cart;
}
function selectTotal(state: state) {
  return state.total;
}
