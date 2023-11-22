import React from 'react'
import ShoppingProductDetail from './../ShoppingProductDetail'
import ShoppingCardDetail from './../ShoppingCardDetail'

export default function ShoppingCart() {
  return (
    <main className='main-container grid grid-cols-2 px-3 justify-items-center min-h-[90vh]'>
        <div className='product-conteiner justify-items-center'>
            <ShoppingProductDetail/>
        </div>
        <div className='card-detail-conteiner'>
            <ShoppingCardDetail/>
        </div>
    </main>
  )
}
