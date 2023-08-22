import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Chaddi", quantity: 4, packed: true },
//   { id: 3, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]); // lifted up

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  // now pass handleAddItems to PackingList as a prop

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // const [items, setItems] = useState([]); // empty array → since the displayed items are packing item which are array

  // function handleAddItems(item) {
  //   setItems((item) => [...items, item]);
  // }  // move to App

  // right now our item state is inside form component, but we need this state inside PackingList component 'cause in PackingList it should be rendered but we can't pass it as a prop since PackingList is sibling of Form
  // To solve this, we lift the state i.e const [items, setItems] = useState([]); to the closest parent component i.e App component

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    // sets the quantity and description back to initial state after form submission
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (currentValue, index) => index + 1).map(
          (num) => (
            <option value={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

// Form and PackingList are sibling components so we have pass data from Form to PackingList directly via props
function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* button click will happen in Item comp but the state lives in App Comp (parent comp) child to parent communication */}
      {/* <button onClick={onDeleteItem}>❌</button> */}
      {/* this won't work because when we simply specify the function, react calls the function when event happens by passing in the event object, but we don't want event we want id of current object therefore below button code*/}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (%)</em>
    </footer>
  );
}
