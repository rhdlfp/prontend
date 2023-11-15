import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import mainImg1 from "../HomeComponents/HomeImg/mainImg1.jpg";
import mainImg2 from "../HomeComponents/HomeImg/mainImg2.jpg";
import mainImg3 from "../HomeComponents/HomeImg/mainImg3.jpg";
import mainImg4 from "../HomeComponents/HomeImg/mainImg4.jpg";
import "swiper/swiper-bundle.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
// import "./MainCarousel.module.css";
import "./MainCarousel.css";

SwiperCore.use([Pagination, Navigation, Keyboard, Autoplay]);

export default function MainCarousel() {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{
                enabled: true,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            autoplay={{
                delay: 5000, // 자동 슬라이드 간격(ms)
                disableOnInteraction: false, // 사용자 상호작용 후 자동 슬라이드 정지 여부
            }}
            modules={[Keyboard, Pagination, Navigation]}
            className="h-auto mySwiper"
        >
            <SwiperSlide style={{ height: "550px" }}>
                <img src={mainImg1} style={{ filter: "brightness(60%)" }} />
            </SwiperSlide>
            <SwiperSlide style={{ height: "550px" }}>
                <img src={mainImg2} style={{ filter: "brightness(60%)" }} />
            </SwiperSlide>
            <SwiperSlide style={{ height: "550px" }}>
                <img src={mainImg3} style={{ filter: "brightness(60%)" }} />
            </SwiperSlide>
            <SwiperSlide style={{ height: "550px" }}>
                <img src={mainImg4} style={{ filter: "brightness(60%)" }} />
            </SwiperSlide>
        </Swiper>
    );
}
