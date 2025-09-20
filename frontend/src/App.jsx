import React, { useEffect, useState } from "react";
import axios from "axios";
import Lenis from "@studio-freight/lenis";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      smooth: true,
      direction: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  const addItem = async () => {
    const res = await axios.post("http://localhost:5000/api/items", { name, description });
    setItems([...items, res.data]);
    setName("");
    setDescription("");
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-5 text-center text-blue-600">Full Stack Test App</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border p-2 w-full mb-3 rounded"
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border p-2 w-full mb-3 rounded"
        />
        <button 
          onClick={addItem} 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </div>

      <div className="max-w-md mx-auto mt-10">
        {items.map(item => (
          <div key={item._id} className="bg-white p-4 mb-3 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-bold">{item.name}</h2>
              <p>{item.description}</p>
            </div>
            <button 
              onClick={() => deleteItem(item._id)} 
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
