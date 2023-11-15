import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import mainImg1 from "../HomeComponents/HomeImg/mainImg1.jpg";
import mainImg2 from "../HomeComponents/HomeImg/mainImg2.jpg";
import mainImg3 from "../HomeComponents/HomeImg/mainImg3.jpg";
import mainImg4 from "../HomeComponents/HomeImg/mainImg4.jpg";
// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([EffectCoverflow, Pagination]);

export default function Ecarousel() {
    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            initialSlide={1}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            className="col-md-12 h-auto mySwiper"
        >
            <SwiperSlide>
                <img src={mainImg1} alt="slide1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={mainImg2} alt="slide2" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={mainImg3} alt="slide3" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={mainImg4} alt="slide4" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={mainImg2} alt="slide5" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={mainImg1} alt="slide6" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={mainImg3} alt="slide7" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={mainImg4} alt="slide8" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={mainImg2} alt="slide9" />
            </SwiperSlide>
        </Swiper>
    );
}
