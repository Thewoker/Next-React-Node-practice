'use client'
import React from 'react'
import ProductCatalog from '@/components/admin/ProductCatalog'

const Admin = () => {

    return (
        <>
            <main className="container m-auto p-4 min-h-screen">
                <h1 className="text-2xl border-b pb-4 my-4">Admin</h1>
                <ProductCatalog />
            </main>
        </>
    )
}

export default Admin