import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Card, Image } from "antd"
import Meta from "antd/es/card/Meta"
import { Link } from "react-router-dom"

interface ProductCardProps {
    product: any
}

export const ProductCard = ({ product }: ProductCardProps) => {

    return (
        <Card
            className="product"
            cover={
                <Image
                    src={product.image}
                />
            }
            actions={[
                <ShoppingCartOutlined key="cart" />,
                <HeartOutlined key="heart" />,
            ]}
        >
            <Meta
                title={<Link to="product">{product.title}</Link>}
            />
        </Card>
    )
}