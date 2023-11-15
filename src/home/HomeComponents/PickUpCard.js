// Cardcarousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { EffectCube, Pagination } from "swiper";

import pickup from "../HomeComponents/HomeImg/pickup.jpg";
import pickup2 from "../HomeComponents/HomeImg/pickup2.jpg";

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
                <img src={pickup} style={{ width: "100%", objectFit: "cover" }} alt="pickup" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={pickup2} style={{ width: "100%", objectFit: "cover" }} alt="mainImg3" />
            </SwiperSlide>
        </Swiper>
    );
}
