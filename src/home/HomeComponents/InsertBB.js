import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import mainImg3 from "../HomeComponents/HomeImg/mainImg3.jpg";
import BakeryService from "../../user/Bakery/BakeryService";
import { withRouter } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

import "swiper/swiper-bundle.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([EffectCoverflow, Pagination]);

class InsertBB extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bakeryList: [], // 빵집 목록
        };
    }

    componentDidMount() {
        BakeryService.getAllBakery()
            .then((res) => {
                if (res && res.data) {
                    this.setState({
                        bakeryList: res.data,
                    });
                } else {
                    console.log("No data found");
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }

    readBakery(id) {
        this.props.history.push({
            pathname: `/read-bakery/${id}`,
        });
    }

    render() {
        const { bakeryList } = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            centerPadding: "30px",
            prevArrow: (
                <button type="button" className="slick-prev" style={{ color: "white", background: "gray !important", border: "none" }}>
                    Previous
                </button>
            ),
            nextArrow: (
                <button type="button" className="slick-next" style={{ color: "white", background: "gray !important", border: "none" }}>
                    Next
                </button>
            ),
        };
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
                {/* <Slider className="offset-md-2 col-md-8 offset-md-2 h-auto" {...settings}> */}
                {bakeryList.map((bakery, index) => (
                    <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
                        <div key={index} onClick={() => this.readBakery(bakery.id)}>
                            <Card style={{ margin: "0 15px", height: "100%" }}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:8080/api/comunity/images/${bakery.mainphoto}`}
                                    style={{ objectFit: "cover", height: "200px" }}
                                />
                                <Card.Body>
                                    <Card.Text>{bakery.name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </SwiperSlide>
                ))}
                {/* </Slider> */}
            </Swiper>
        );
    }
}

export default withRouter(InsertBB);
