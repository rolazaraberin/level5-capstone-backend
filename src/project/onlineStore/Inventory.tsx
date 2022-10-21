import React, { useEffect, useState } from "react";
import { addItem } from "./reducer";
import { generateKey } from "scripts/utilityFunctionsReact";
import { useDispatch, useSelector } from "react-redux";
import { item, state } from "./types";
import { Button } from "react-bootstrap";

export default Inventory;

function Inventory() {
  type inventory = ReturnType<typeof toInventory>;
  const [inventory, setInventory] = useState<inventory[]>();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  useEffect(componentDidMount, []);

  return (
    <table className="inventory">
      <tbody>{inventory}</tbody>
    </table>
  );

  /************************************/

  function componentDidMount() {
    //USE SELECTOR - https://redux.js.org/tutorials/fundamentals/part-5-ui-react#using-redux-with-react
    //USE DISPATCH - https://redux.js.org/tutorials/fundamentals/part-5-ui-react#dispatching-actions-with-usedispatch

    const inventory = items && items.map(toInventory);
    setInventory(inventory);
  }
  function handleAdd(item: item) {
    return () => dispatch(addItem(item));
  }
  function toInventory(
    item: { name: string; price: number },
    _index: number,
    _array: {}[]
  ) {
    return (
      <tr className="inventory-item" key={generateKey()}>
        <td>
          {item.name} ${item.price}.00
        </td>
        <td>
          <Button onClick={handleAdd(item)}>Add to cart</Button>
        </td>
      </tr>
    );
  }
}
function selectItems(state: state) {
  return state.items;
}
