import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Carousel, Image } from "antd"
import { ProductList } from "../../features/product/ProductList";

const products: any = [
    {
        id: 1,
        image: 'https://content1.rozetka.com.ua/goods/images/big/400868809.jpg',
        title: `Ігрова комп'ютерна миша XTRIKE ME GM-520 провідна USB з RGB підсвічуванням |800-12800 6 step DPI, USB| Black`
    },
    {
        id: 2,
        image: 'https://content1.rozetka.com.ua/goods/images/big/368596106.jpg',
        title: 'Процесор AMD Ryzen 7 7700 3.8GHz/32MB (100-100000592MPK) sAM5 Multipack'
    },
    {
        id: 3,
        image: 'https://content1.rozetka.com.ua/goods/images/big/379903174.png',
        title: 'Мишка бездротова оптична MEETION 2.4G MT-R545 Рожевий'
    },{
        id: 4,
        image: 'https://content1.rozetka.com.ua/goods/images/big/400868809.jpg',
        title: `Ігрова комп'ютерна миша XTRIKE ME GM-520 провідна USB з RGB підсвічуванням |800-12800 6 step DPI, USB| Black`
    },{
        id: 5,
        image: 'https://content1.rozetka.com.ua/goods/images/big/400868809.jpg',
        title: `Ігрова комп'ютерна миша XTRIKE ME GM-520 провідна USB з RGB підсвічуванням |800-12800 6 step DPI, USB| Black`
    },{
        id: 6,
        image: 'https://content1.rozetka.com.ua/goods/images/big/400868809.jpg',
        title: `Ігрова комп'ютерна миша XTRIKE ME GM-520 провідна USB з RGB підсвічуванням |800-12800 6 step DPI, USB| Black`
    },{
        id: 7,
        image: 'https://content1.rozetka.com.ua/goods/images/big/400868809.jpg',
        title: `Ігрова комп'ютерна миша XTRIKE ME GM-520 провідна USB з RGB підсвічуванням |800-12800 6 step DPI, USB| Black`
    },{
        id: 8,
        image: 'https://content1.rozetka.com.ua/goods/images/big/400868809.jpg',
        title: `Ігрова комп'ютерна миша XTRIKE ME GM-520 провідна USB з RGB підсвічуванням |800-12800 6 step DPI, USB| Black`
    },
];

export const Home = () => {
    return (
        <div>
            <Carousel
                arrows={true}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
            >
                <picture>
                    <Image
                        src='https://content1.rozetka.com.ua/banner_main/image_ua/original/407134039.jpg'
                        wrapperStyle={{ display: 'block' }}
                        style={{ maxWidth: '100%', maxHeight: '400px', margin: '0 auto' }} />
                </picture>
                <picture>
                    <Image
                        src='https://content1.rozetka.com.ua/banner_main/image_ua/original/407134039.jpg'
                        wrapperStyle={{ display: 'block' }}
                        style={{ maxWidth: '100%', maxHeight: '400px', margin: '0 auto' }} />
                </picture>
                <picture>
                    <Image
                        src='https://content1.rozetka.com.ua/banner_main/image_ua/original/407134039.jpg'
                        wrapperStyle={{ display: 'block' }}
                        style={{ maxWidth: '100%', maxHeight: '400px', margin: '0 auto' }} />
                </picture>
                <picture>
                    <Image
                        src='https://content1.rozetka.com.ua/banner_main/image_ua/original/407134039.jpg'
                        wrapperStyle={{ display: 'block' }}
                        style={{ maxWidth: '100%', maxHeight: '400px', margin: '0 auto' }} />
                </picture>
            </Carousel>
            <div>
                <h2>Latest viewed</h2>
                <ProductList products={products} />
            </div>
        </div>
    )
}

const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <RightCircleOutlined className="slick-next" color="white" onClick={onClick} />
    );
};

const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <LeftCircleOutlined className="slick-prev" onClick={onClick} />
    );
};

