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
    const formattedDate = new Date(date).toLocaleString("ko-KR", options).replace(/\//g, ".");
    return formattedDate;
};

class ReadQnaComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            qna: {},
            attachedFiles: [],
        };

        this.goToUpdate = this.goToUpdate.bind(this);
    }

    componentDidMount() {
        QnaService.getOneQna(this.state.no)
            .then((res) => {
                if (res && res.data) {
                    this.setState({
                        qna: res.data,
                        attachedFiles: res.data.attachedFiles,
                    });
                    console.log("get result => " + JSON.stringify(res.data));
                } else {
                }
            })
            .catch((error) => {});
    }

    returnBoardType(typeNo) {
        let type = null;
        if (typeNo === "1") {
            type = "자유게시판";
        } else if (typeNo === "2") {
            type = "Q&A 게시판";
        } else {
            type = "타입 미지정";
        }

        return (
            <div className="card">
                <label className="card" style={{ paddingLeft: "20px" }}>
                    게시판 종류{" "}
                </label>
                <div className="card-body" style={{ marginLeft: "20px" }}>
                    {type}
                </div>
            </div>
        );
    }

    returnDate(cTime, uTime) {
        return (
            <div className="card">
                <label className="card">
                    <div className="card-body">
                        생성일 : [ {formatDate(cTime)} ] / 최종 수정일 : [ {formatDate(uTime)} ]
                    </div>
                </label>
            </div>
        );
    }

    goToList() {
        this.props.history.push("/qna");
    }

    goToUpdate = () => {
        const { no } = this.state;
        const { userid, nickname } = this.props.location.state;

        this.props.history.push({
            pathname: `/create-qna/${no}`,
            state: { userid, nickname },
        });
    };

    async deleteView() {
        if (window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다.")) {
            try {
                const res = await QnaService.deleteQna(this.state.no);
                if (res.status === 200) {
                    this.props.history.push("/qna");
                } else {
                    alert("글 삭제에 실패했습니다.");
                }
            } catch (error) {
                console.error("Error while deleting: ", error);
            }
        }
    }

    render() {
        return (
            <div>
                <div className="card col-md-8 offset-md-2">
                    <h3 className="text-center"> Read Detail</h3>
                    <div className="card-body">
                        {this.returnBoardType(this.state.qna.type)}
                        <div className="card">
                            <label className="card" style={{ paddingLeft: "20px" }}>
                                {" "}
                                제목{" "}
                            </label>
                            <div className="card-body" style={{ marginLeft: "20px" }}>
                                {this.state.qna.title}
                            </div>
                        </div>
                        <div className="card">
                            <label className="card" style={{ paddingLeft: "20px" }}>
                                {" "}
                                글 내용{" "}
                            </label>
                            <div className="card-body" value={this.state.qna.contents} readOnly>
                                {this.state.attachedFiles.map((file, index) => (
                                    <div key={index}>
                                        <img
                                            className="rounded float-left"
                                            src={`http://localhost:8080/api/qna/images/${file.storeFilename}`}
                                            alt={`file_${index}`}
                                        />
                                    </div>
                                ))}
                                <div className="card-body" dangerouslySetInnerHTML={{ __html: this.state.qna.contents }}></div>
                            </div>
                        </div>

                        <div className="card">
                            <label className="card" style={{ paddingLeft: "20px" }}>
                                {" "}
                                작성자{" "}
                            </label>
                            <div className="card-body" style={{ marginLeft: "20px" }}>
                                {this.state.qna.nickname}
                            </div>
                        </div>
                        {this.returnDate(this.state.qna.createdTime, this.state.qna.updatedTime)}
                        <div style={{ marginTop: "10px" }}>
                            <button className="btn btn-outline-secondary" onClick={this.goToList.bind(this)}>
                                글 목록으로 이동
                            </button>

                            {this.props.location.state.userid === this.state.qna.userid && (
                                <div style={{ display: "inline-block", marginLeft: "10px" }}>
                                    <button className="btn btn-outline-secondary" onClick={this.goToUpdate} style={{ marginLeft: "10px" }}>
                                        글 수정
                                    </button>
                                    <button className="btn btn-outline-secondary" onClick={() => this.deleteView()} style={{ marginLeft: "10px" }}>
                                        글 삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadQnaComponent;
