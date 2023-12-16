"use client"
import { React, useState, useEffect } from "react";
import ItemCardDetail from "./ItemCardDetail";
import CardInfo from "./CardInfo";
import { useAuthContext } from "@/contexts/AuthContext"


export default function ShoppingCart() {
  const { user, getCart } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCart();
      setCartItems(items);
    };

    fetchCart();
  }, [getCart]);

  return (
    <main className="w-full flex">
      <section className="w-3/5 p-4 overflow-y-auto h-64">
        <h1 className="text-xl font-bold mb-4">Productos</h1>
        {cartItems?.map((product) => (
          <ItemCardDetail key={product.slug} item={product} />
        ))}
      </section>
      <section className="w-2/5 p-4">
        <h1 className="text-xl font-bold mb-4">Tarjeta</h1>
        <CardInfo />
      </section>
    </main>
  );
}
