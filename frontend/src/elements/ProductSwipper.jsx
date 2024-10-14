import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../swipper.css'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ProductSwipper = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return(
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                    }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2"
            >
            <div className="product-large-image">
                {product ? (
                    product.image.map(
                        (item, index) =>
                            <SwiperSlide key={index}>
                                <div className="single-image">
                                    <img src={item.image} className="d-block w-100"/>
                                </div>
                            </SwiperSlide>
                    )
                ) : (
                    <p>Loading..</p>
                )}
            </div>
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <div className="product-small-image">
                    {product ? (
                        product.image.map(
                            (item, index) =>
                                <SwiperSlide key={index}>
                                    <div className="single-image-thumb">
                                        <img src={item.image} ></img>
                                    </div>
                                </SwiperSlide>
                        )
                    ) : (
                        <p>Loading..</p>
                    )}
                </div>
            </Swiper>

        </>
    )

}

export default ProductSwipper;