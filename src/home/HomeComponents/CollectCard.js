// Cardcarousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { EffectCube, Pagination } from "swiper";

import collect from "../HomeComponents/HomeImg/collect.webp";
import collect2 from "../HomeComponents/HomeImg/collect2.jpg";

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
                <img src={collect} style={{ width: "100%", objectFit: "cover" }} alt="mainImg1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={collect2} style={{ width: "100%", objectFit: "cover" }} alt="mainImg3" />
            </SwiperSlide>
        </Swiper>
    );
}
