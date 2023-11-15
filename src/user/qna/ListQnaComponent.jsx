import React, { Component } from "react";
import QnaService from "../qna/QnaService";

const formatDate = (date) => {
  if (!date) return "";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = new Date(date)
    .toLocaleString("ko-KR", options)
    .replace(/\//g, ".");
  return formattedDate;
};

class ListQnaComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      p_num: 1,
      paging: {},
      qna: [],
    };

    this.createQna = this.createQna.bind(this);
  }

  componentDidMount() {
    QnaService.getQna(this.state.p_num)
      .then((res) => {
        if (res && res.data) {
          this.setState({
            p_num: res.data.pagingData.currentPageNum,
            paging: res.data.pagingData,
            qna: res.data.list,
          });
        } else {
        }
      })
      .catch((error) => {});
  }

  createQna() {
    this.props.history.push({
      pathname: "/create-qna/_create",
      state: {
        userid: this.props.currentUser.id,
        nickname: this.props.currentUser.nickname,
      },
    });
  }

  readQna(no) {
    this.props.history.push({
      pathname: `/read-qna/${no}`,
      state: {
        userid: this.props.currentUser.id,
        nickname: this.props.currentUser.nickname,
      },
    });
  }

  listQna(p_num) {
    console.log("pageNum : " + p_num);
    QnaService.getQna(p_num).then((res) => {
      console.log(res.data);

      this.setState({
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
        qna: res.data.list,
      });
    });
  }

  viewPaging() {
    const pageNums = [];

    for (
      let i = this.state.paging.pageNumStart;
      i <= this.state.paging.pageNumEnd;
      i++
    ) {
      pageNums.push(i);
    }

    return pageNums.map((page) => (
      <li className="page-item" key={page.toString()}>
        <a className="page-link" onClick={() => this.listQna(page)}>
          {page}
        </a>
      </li>
    ));
  }

  isPagingPrev() {
    if (this.state.paging.prev) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listQna(this.state.paging.currentPageNum - 1)}
            tabIndex="-1"
          >
            Previous
          </a>
        </li>
      );
    }
  }

  isPagingNext() {
    if (this.state.paging.next) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listQna(this.state.paging.currentPageNum + 1)}
            tabIndex="-1"
          >
            Next
          </a>
        </li>
      );
    }
  }

  isMoveToFirstPage() {
    if (this.state.p_num !== 1) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listQna(1)}
            tabIndex="-1"
          >
            Move to First Page
          </a>
        </li>
      );
    }
  }

  isMoveToLastPage() {
    if (this.state.p_num !== this.state.paging.pageNumCountTotal) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listQna(this.state.paging.pageNumCountTotal)}
            tabIndex="-1"
          >
            LastPage({this.state.paging.pageNumCountTotal})
          </a>
        </li>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Q&A List</h2>
        <div className="row"></div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>글 번호</th>
                <th>타이틀</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>갱신일</th>
              </tr>
            </thead>
            <tbody>
              {this.state.qna.map((qna) => (
                <tr key={qna.no}>
                  <td>{qna.no}</td>
                  <td>
                    <a onClick={() => this.readQna(qna.no)}>{qna.title} </a>
                  </td>
                  <td>{qna.nickname}</td>
                  <td>{formatDate(qna.createdTime)}</td>
                  <td>{formatDate(qna.updatedTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary btn-sm" onClick={this.createQna}>
              글 작성
            </button>
          </div>
        </div>
        <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-left">
              {this.isMoveToFirstPage()}
              {this.isPagingPrev()}
              {this.viewPaging()}
              {this.isPagingNext()}
              {this.isMoveToLastPage()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default ListQnaComponent;
