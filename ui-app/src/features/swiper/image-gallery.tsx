import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './image-gallery.css';

export const ImageGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src="https://content1.rozetka.com.ua/goods/images/big/400868809.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content2.rozetka.com.ua/goods/images/big/400868811.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content1.rozetka.com.ua/goods/images/big/400868814.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content1.rozetka.com.ua/goods/images/big/400868817.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content.rozetka.com.ua/goods/images/big/400868819.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content1.rozetka.com.ua/goods/images/big/400868821.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://content1.rozetka.com.ua/goods/images/big/400868809.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content2.rozetka.com.ua/goods/images/big/400868811.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content1.rozetka.com.ua/goods/images/big/400868814.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content1.rozetka.com.ua/goods/images/big/400868817.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content.rozetka.com.ua/goods/images/big/400868819.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://content1.rozetka.com.ua/goods/images/big/400868821.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}