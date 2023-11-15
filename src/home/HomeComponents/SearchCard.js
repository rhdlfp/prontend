// Cardcarousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { EffectCube, Pagination } from "swiper";

import search from "../HomeComponents/HomeImg/search.jpg";
import cakes from "../HomeComponents/HomeImg/cakes.jpg";

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
            style={{ height: "280px", width: "100%" }}
        >
            <SwiperSlide>
                <img src={search} style={{ width: "100%", objectFit: "cover" }} alt="mainImg1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={cakes} style={{ width: "100%", objectFit: "cover" }} alt="mainImg3" />
            </SwiperSlide>
        </Swiper>
    );
}
