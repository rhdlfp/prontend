import React, { Component } from "react";
import BakeryService from "./BakeryService";

class ListBakeryComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      bakery: {}, // 게시물 목록
      
      no: 1, // ID 값이 1인 항목을 가져오기 위한 설정
    };
  }

  componentDidMount() {
    BakeryService.getOneBakery(this.state.no)
      .then((res) => {
        if (res && res.data) {
          this.setState({
            bakery: res.data,
          });
          console.log("get result => " + JSON.stringify(res.data));
          console.log("Name: " + res.data.name);
          console.log("Name: " + res.data.photonames); // ID가 1인 데이터의 이름을 콘솔에 출력
          console.log(this.state.bakery.photonames);
          console.log(this.state.bakery.menus);
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
      state: {
        id: this.props.id,
        name: this.props.name,
      },
    });
  }

  render() {
    const { bakery } = this.state;
    return (
      <div className="container">
        <h2 className="text-center">Review List</h2>
        <div className="row"></div>
  
        <div className="row">
          <div className="col-md-12 h-auto d-flex flex-row flex-wrap justify-content-center ">
          <div key={bakery.id}><h2>{bakery.name}</h2></div>
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end"></div>
      </div>
    );
  }
  
}

export default ListBakeryComponent;
