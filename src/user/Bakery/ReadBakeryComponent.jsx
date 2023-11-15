import React, { Component } from "react";
import BakeryService from "./BakeryService";
import { Link } from "react-router-dom";
import "../Bakery/bakery.css";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MultipleSelectChip from "../Bakery/BakeryMenus";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "react-s-alert";
import ReviewList from "../comunity/ReviewList";

const ACCESS_TOKEN = "accessToken";

class ReadBakeryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.id,
            bakery: {},
            photonames: [],
            menus: [],
            rating: 0,
            selectedMenu: [],
            token: localStorage.getItem(ACCESS_TOKEN),
        };
    }
    handleMenuSelection = (selectedMenu) => {
        const { bakery } = this.state;
        let updatedSelectedMenu = [...this.state.selectedMenu];
        selectedMenu.forEach((menu) => {
            const foundMenu = bakery.menus.find((item) => item.menuname === menu);
            if (foundMenu) {
                const existingItemIndex = updatedSelectedMenu.findIndex((item) => item.menuname === foundMenu.menuname);
                if (existingItemIndex !== -1) {
                    // 이미 선택된 메뉴가 있는 경우 수량을 증가시키지 않고 그대로 유지합니다.
                } else {
                    updatedSelectedMenu.push({
                        menuname: foundMenu.menuname,
                        price: foundMenu.price,
                        quantity: 1,
                    });
                }
            } else {
                updatedSelectedMenu.push({ menuname: menu, price: 0, quantity: 1 });
            }
        });
        this.setState({ selectedMenu: updatedSelectedMenu });
    };

    handleDeleteMenu = (index) => {
        const updatedSelectedMenu = [...this.state.selectedMenu];
        updatedSelectedMenu.splice(index, 1);
        this.setState({ selectedMenu: updatedSelectedMenu });
    };

    handleIncrement = (index) => {
        const { selectedMenu } = this.state;
        const updatedSelectedMenu = [...selectedMenu];
        updatedSelectedMenu[index].quantity = (updatedSelectedMenu[index].quantity || 0) + 1;
        this.setState({ selectedMenu: updatedSelectedMenu });
    };

    handleDecrement = (index) => {
        const { selectedMenu } = this.state;
        const updatedSelectedMenu = [...selectedMenu];
        updatedSelectedMenu[index].quantity = Math.max((updatedSelectedMenu[index].quantity || 0) - 1, 0);
        this.setState({ selectedMenu: updatedSelectedMenu });
    };

    componentDidMount() {
        BakeryService.getOneBakery(this.state.no)
            .then((res) => {
                if (res && res.data) {
                    this.setState({
                        bakery: res.data,
                        photonames: res.data.photonames,
                        menus: res.data.menus,
                    });

                    console.log("get result => " + JSON.stringify(res.data));
                } else {
                }
            })
            .catch((error) => {});
    }

    handleRatingChange = (rating) => {
        // 별점 변경 핸들러
        this.setState({ rating });
    };

    goToList() {
        this.props.history.push("/bakery");
    }

    handlePayment = () => {
        let totalSelectedMenuPrice = 0;
        this.state.selectedMenu.forEach((menu) => {
            totalSelectedMenuPrice += menu.price * (menu.quantity || 0);
        });

        const paymentRequest = {
            id: this.props.currentUser.id,
            store_name: this.state.bakery.name,
            store_address: this.state.bakery.detailejuso,
            total_amount: totalSelectedMenuPrice,
            menuNames: this.state.selectedMenu.map((menu) => menu.menuname),
            quantitys: this.state.selectedMenu.map((menu) => String(menu.quantity)),
            menuPrices: this.state.selectedMenu.map((menu) => String(menu.price * (menu.quantity || 0))),
        };

        const apiUrl = `http://localhost:8080/payment/ready`;

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.state.token}`,
            },
            body: JSON.stringify(paymentRequest),
        };

        fetch(apiUrl, config)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("API 호출 중 오류가 발생했습니다.");
                }
            })
            .then((data) => {
                // "next_redirect_pc_url"로 새 창 열기
                window.open(data.next_redirect_pc_url, "_blank");
            })
            .catch((error) => {
                console.error("API 호출 중 오류:", error);
                console.error(error.message);
                console.error(error.stack);
                Alert.error("API 호출 중 오류가 발생했습니다.");
            });
    };

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            cssEase: "linear",
            variableWidth: true,
            centerMode: true,
            centerPadding: "0",
            margin: 10, // 슬라이드 간의 간격
        };
        let totalSelectedMenuPrice = 0;
        this.state.selectedMenu.forEach((menu) => {
            totalSelectedMenuPrice += menu.price * (menu.quantity || 0);
        });
        return (
            <div>
                <div className="row">
                    <div className="card offset-md-2 col-md-6" style={{ marginRight: "20px;" }}>
                        <div className="card-body">
                            <div className="card">
                                <div className="card-body">
                                    <img id="bakeryImg" src={`http://localhost:8080/api/comunity/images/${this.state.bakery.mainphoto}`} />
                                    <hr />
                                    <h3>{this.state.bakery.name}</h3>
                                    <p>{this.state.bakery.detailejuso}</p>
                                    <hr />
                                    <p>사진</p>
                                    <Slider {...settings} id="detailSlider">
                                        {this.state.bakery.photonames &&
                                            this.state.bakery.photonames.map((photoname, index) => (
                                                <div key={index} className="col-md-4">
                                                    <Card style={{ margin: "0 10px", width: "300px", height: "200px" }}>
                                                        <Card.Img
                                                            id={`bakeryImg${index}`}
                                                            variant="top"
                                                            src={`http://localhost:8080/api/comunity/images/${photoname}`}
                                                        />
                                                    </Card>
                                                </div>
                                            ))}
                                    </Slider>
                                    <br />
                                    <hr />
                                    <h3>상세 정보</h3>
                                    <br />
                                    <p>영업시간</p>
                                    {this.state.bakery.businesshours}
                                    <hr />
                                    <h3>메뉴 정보</h3>
                                    {this.state.bakery.menus &&
                                        this.state.bakery.menus.map((menu, index) => (
                                            <div key={index}>
                                                <li>{menu.menuname}</li>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="card" style={{ marginTop: "10px" }}>
                                <ReviewList bakeryName={this.state.bakery.name} {...this.props} />
                                <Link
                                    to={{
                                        pathname: `/create-comunity/_create`,
                                        state: {
                                            bakeryName: this.state.bakery.name,
                                            userid: this.props.currentUser.id,
                                            nickname: this.props.currentUser.nickname,
                                            rating: this.state.rating,
                                        },
                                    }}
                                    className="btn btn-primary btn-sm"
                                >
                                    글 작성
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id="selectMenu" className="card col-md-2 h-100" style={{ position: "sticky", top: "10px" }}>
                        <div className="card-body">
                            <h3>메뉴선택</h3>
                            <MultipleSelectChip
                                bakeryMenus={this.state.bakery.menus}
                                selectedMenu={this.state.selectedMenu} // 선택된 메뉴 목록 전달
                                onMenuSelection={this.handleMenuSelection} // 메뉴 선택 핸들러 전달
                                onDeleteMenu={this.handleDeleteMenu} // 메뉴 삭제 핸들러 전달
                            />
                            <Button onClick={() => this.setState({ selectedMenu: [] })}>메뉴 초기화</Button>
                            {this.state.selectedMenu.length > 0 && (
                                <div>
                                    <h3>선택된 메뉴 </h3>
                                    {this.state.selectedMenu.map((menu, index) => (
                                        <div key={index}>
                                            <p>
                                                {menu.menuname} {menu.price}원{" "}
                                                {/* <Button variant="outlined" onClick={() => this.handleDeleteMenu(index)}>
                                                    X{" "}
                                                </Button> */}
                                                <IconButton aria-label="delete" size="small" onClick={() => this.handleDeleteMenu(index)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </p>
                                            <p>
                                                <Button onClick={() => this.handleDecrement(index)}>-</Button>
                                                <span>{menu.quantity || 0}</span>
                                                <Button onClick={() => this.handleIncrement(index)}>+</Button>
                                                {menu.price * (menu.quantity || 0)}원
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="card">
                            <div className="card-body" style={{ textAlign: "right" }}>
                                {totalSelectedMenuPrice}원
                            </div>
                            <Button variant="contained" color="primary" onClick={this.handlePayment}>
                                결제하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadBakeryComponent;
