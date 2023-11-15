import * as React from "react";
// import CardComponent from "../HomeComponents/CardComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchCard from "./SearchCard";
import CollectCard from "./CollectCard";
import ReviewCard from "./ReviewCard";
import PickUpCard from "./PickUpCard";

export default function CreateB() {
    return (
        <div className="container">
            <div className="col-md-12 h-auto ">
                <div className="row">
                    <div className="col-md-7 " style={{ height: "400px" }}>
                        <div className="card text-bg-light mb-3 " style={{ maxWidth: "50rem", height: "420px" }}>
                            <h2 style={{ color: "rgb(238, 150, 75)", marginLeft: "30px", marginTop: "10px" }}>Search</h2>
                            <h6 style={{ marginLeft: "30px", color: "grey" }}>맛있는 빵의 여행, 검색으로 시작하세요</h6>
                            <div className="card-body h-auto">
                                <SearchCard />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card text-bg-light mb-3" style={{ maxWidth: "50rem", height: "420px" }}>
                            <h2 style={{ color: "rgb(238, 150, 75)", marginLeft: "30px", marginTop: "10px" }}>Collect</h2>
                            <h6 style={{ marginLeft: "30px", color: "grey" }}>각양각색의 빵을 맛보며 빵지순례를 떠나보세요</h6>
                            <div className="card-body h-auto">
                                <CollectCard />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 h-auto">
                        <div className="card text-bg-light mb-3" style={{ maxWidth: "50rem", height: "420px" }}>
                            <h2 style={{ color: "rgb(238, 150, 75)", marginLeft: "30px", marginTop: "10px" }}>Review</h2>
                            <h6 style={{ marginLeft: "30px", color: "grey" }}>리뷰를 작성하고 맛과 품질에 대한 의견을 공유하세요</h6>
                            <div className="card-body h-auto">
                                <ReviewCard />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 h-auto">
                        <div className="card text-bg-light mb-3" style={{ maxWidth: "50rem", height: "420px" }}>
                            <h2 style={{ color: "rgb(238, 150, 75)", marginLeft: "30px", marginTop: "10px" }}>Pick-up</h2>
                            <h6 style={{ marginLeft: "30px", color: "grey" }}>빵의 신선함을 그대로! 주문하고 가까운 빵집에서 픽업하세요</h6>
                            <div className="card-body h-auto">
                                <PickUpCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
