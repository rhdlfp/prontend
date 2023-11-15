import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.module.css";
import { Container, Row } from "react-bootstrap";
import CreateB from "../home/HomeComponents/CreateB";

import InsertBB from "../home/HomeComponents/InsertBB";
import Ecarousel from "../home/HomeComponents/Ecarousel";
import Cardcarousel from "./HomeComponents/ReviewCard";
// import SearchBar from "../user/SearchBar/SearchBar";
import "./HomeComponents/MainCarousel.module.css";
import MainDisplay from "./HomeComponents/MainDisplay";
import { grey } from "@mui/material/colors";
class Home extends Component {
    render() {
        return (
            <>
                <Container style={{ backgroundColor: "rgb(240, 234, 233)" }}>
                    <Row />
                    {/* 메인 */}
                    <MainDisplay className="col-md-10 h-auto" />
                </Container>
                <Row style={{ height: "70px" }} />
                <Container>
                    <CreateB />
                    {/* <Cardcarousel /> */}
                    <Row style={{ height: "70px" }} />
                </Container>
                <Container>
                    <Row>
                        <h2 className="col-md-12 h-auto">최근 추가된 빵집</h2>
                    </Row>
                    <Row>
                        <h6 className="col-md-12 h-auto" style={{ color: "grey" }}>
                            맛있는 출발, 새로운 빵집에서 새로운 맛을 경험하세요!
                        </h6>
                    </Row>
                    <Row style={{ height: "20px" }} />
                    <InsertBB className="col-md-12 h-auto" />
                    <Row style={{ height: "120px" }} />
                </Container>
                <Container>
                    <Row>
                        <h2 className="col-md-12 h-auto">가장 많이 검색된 빵</h2>
                        <h6 className="col-md-12 h-auto" style={{ color: "grey" }}>
                            많은 사람들이 찾는 그 맛! 인기 검색 1위 빵, 지금 바로 만나보세요
                        </h6>
                    </Row>
                    <Row style={{ height: "20px" }} />
                    <Ecarousel className="col-md-12 h-auto" />
                    {/* 가장 많이 검색된 빵 */}
                    <Row style={{ height: "150px" }} />
                </Container>
            </>
        );
    }
}

export default Home;
