// Cardcarousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { EffectCube, Pagination } from "swiper";

import review from "../HomeComponents/HomeImg/review.webp";
import review2 from "../HomeComponents/HomeImg/review2.jpg";

SwiperCore.use([EffectCube, Pagination]);

export default function Cardcarousel() {
    return (
        <Swiper
            effect={"cube"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            initialSlide={0}
            cubeEffect={{
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            }}
            pagination={false}
            className="mySwiper5"
            style={{ height: "280px" }}
        >
            <SwiperSlide>
                <img src={review} style={{ width: "100%", objectFit: "fill" }} alt="mainImg1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={review2} style={{ width: "100%", objectFit: "fill" }} alt="mainImg3" />
            </SwiperSlide>
        </Swiper>
    );
}
