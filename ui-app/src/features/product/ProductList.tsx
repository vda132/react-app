import { ProductCard } from "./ProductCard"

interface ProductListProps {
    products: []
}


export const ProductList = ({ products }: ProductListProps) => {

    return (
        <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', gap:'20px' }}>
            {
                products.map((el: any) => (
                    <li key={el.id} style={{width: '16%'}}>
                        <ProductCard key={el.id} product={el} />
                    </li>
                ))
            }
        </ul>
    )
}