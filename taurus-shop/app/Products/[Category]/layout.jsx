import Link from "next/link"




const ProductosLayout = ({children}) => {

    return (
        <div className="container m-auto">
            <nav className="flex gap-10 py-4">
                <Link href={"/Products/all"}>Todos</Link>
                <Link href={"/Products/tvs"}>TVs</Link>
                <Link href={"/Products/hornos"}>Hornos</Link>
                <Link href={"/Products/aires"}>Aires</Link>
            </nav>

            {children}
        </div>
    )
}

export default ProductosLayout