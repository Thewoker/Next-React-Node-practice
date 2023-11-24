import React from "react";
import ShoppingProductDetail from "./../ShoppingProductDetail";
import ShoppingCardDetail from "./../ShoppingCardDetail";

export default function ShoppingCart() {
  return (
    <main className="main-container px-3 min-h-[90vh]">
      <div className="grid grid-cols-3 justify-items-center px-3">
        <div className="product-conteiner justify-items-center col-span-2">
          <h2>Product</h2>
          <div>
            <ShoppingProductDetail />
          </div>
        </div>
        <div className="card-detail-conteiner col-span-1 row-span-1">
          <h2>Product</h2>
          <div>
            <ShoppingCardDetail />
          </div>
        </div>
      </div>
    </main>
  );
}
