import React from "react";
import mainImg1 from "../HomeComponents/HomeImg/mainImg1.jpg";
import mainImg2 from "../HomeComponents/HomeImg/mainImg2.jpg";
import mainImg3 from "../HomeComponents/HomeImg/mainImg3.jpg";
import mainImg4 from "../HomeComponents/HomeImg/mainImg4.jpg";
import mainImg5 from "../HomeComponents/HomeImg/mainImg5.jpg";
import mainImg6 from "../HomeComponents/HomeImg/mainImg6.jpg";
import mainImg7 from "../HomeComponents/HomeImg/mainImg7.jpg";
import mainImg8 from "../HomeComponents/HomeImg/mainImg8.jpg";
import mainImg9 from "../HomeComponents/HomeImg/clay.jpg";
import "./MainDisplay.css";

const MainDisplay = () => {
    return (
        <div
            id="mainDis"
            className="container"
            style={{
                backgroundImage: `url(${mainImg9})`,
                backgroundSize: "cover",
                height: "490px",
            }}
        >
            <div id="mainDisRow1" className="row text-center" style={{ marginBottom: "10px", backgroundColor: "none" }}>
                <div className="col-md-5" style={{ marginRight: "20px", marginLeft: "60px", marginTop: "40px" }}>
                    <h1 style={{ color: "white" }}>당신을 위한 특별한 빵과의 여행이 시작됩니다!</h1>
                </div>
                <div className="col-md-4" style={{ borderRadius: "0 150px 0 150px", backgroundColor: "rgb(238, 150, 75)" }}></div>
                <img className="col-md-2" src={mainImg2} style={{ borderRadius: "150px 150px 0 150px", filter: "grayscale(50%)" }} />
            </div>
            <div id="mainDisRow2" className="row text-center" style={{ marginBottom: "10px" }}>
                <div className="col-md-5" style={{ marginRight: "20px", marginLeft: "60px", marginTop: "40px" }}>
                    <h1 style={{ color: "white" }}>여유로운 시간 속에서</h1>
                </div>
                <img className="col-md-2" src={mainImg3} style={{ borderRadius: "0px 150px 150px 150px", filter: "grayscale(50%)" }} />
                <div className="col-md-2" style={{ backgroundColor: "rgb(238, 150, 75)" }}></div>
                <img className="col-md-2" src={mainImg6} style={{ borderRadius: "0px 0px 0px 150px", filter: "grayscale(40%)" }} />
            </div>
            <div id="mainDisRow3" className="row text-center" style={{ marginBottom: "10px" }}>
                <div className="col-md-5" style={{ marginRight: "20px", marginLeft: "60px", marginTop: "40px" }}>
                    <h1 style={{ color: "white" }}>다양한 즐거움을 느껴보세요.</h1>
                </div>
                <div className="col-md-2" style={{ borderRadius: "150px", backgroundColor: "rgb(238, 150, 75)" }}></div>
                <img className="col-md-4" src={mainImg7} style={{ borderRadius: "150px 150px 0 150px", filter: "grayscale(60%)" }} />
            </div>
        </div>
    );
};

export default MainDisplay;
