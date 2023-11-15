import React, { Component } from "react";
import ProfileService from "./ProfileService";

class PaymentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      paymentList: [],
      selectedStoreId: null, // 선택한 매장의 ID를 저장
      buyList: [], // 구매 목록을 저장
    };
  }

  componentDidMount() {
    this.loadPaymentList();
  }

  loadPaymentList() {
    ProfileService.getPaymentList(this.props.id)
      .then((response) => {
        this.setState({ paymentList: response.data });
      })
      .catch((error) => {
        console.error("결제 내역을 불러오는 중에 오류가 발생했습니다: ", error);
      });
  }

  // 클릭 이벤트 핸들러: 매장명을 클릭하면 해당 매장의 구매 목록을 불러옴
  handleStoreClick(storeId) {
    ProfileService.getBuyList(storeId)
      .then((response) => {
        this.setState({ buyList: response.data, selectedStoreId: storeId });
      })
      .catch((error) => {
        console.error("구매 목록을 불러오는 중에 오류가 발생했습니다: ", error);
      });
  }

  render() {
    const { paymentList, selectedStoreId, buyList } = this.state;

    return (
      <div className="payment-list">
        <h3 className="mb-4">결제 내역</h3>
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th scope="row">매장명</th>
              <th scope="row">매장주소</th>
              <th scope="row">금액</th>
              <th scope="row">상태</th>
            </tr>
          </thead>
          <tbody>
            {paymentList.map((payment, index) => (
              <tr key={index}>
                <td>
                  {/* 클릭 이벤트 핸들러를 추가하여 매장명 클릭 시 구매 목록을 불러옴 */}
                  <a onClick={() => this.handleStoreClick(payment.id)}>{payment.storeName}</a>
                </td>
                <td>{payment.storeAddress}</td>
                <td>{payment.price}원</td>
                <td>
                  {payment.status === "waiting"
                    ? "결재대기"
                    : payment.status === "completed"
                    ? "결재완료"
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 선택한 매장의 구매 목록을 표시 */}
        {selectedStoreId && (
          <div>
            <h3 className="mt-4">구매 목록</h3>
            <table className="table table-hover">
              <thead>
                <tr class="table-primary">
                  <th>메뉴명</th>
                  <th>수량</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {buyList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.menuName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.menuPrice}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default PaymentList;
