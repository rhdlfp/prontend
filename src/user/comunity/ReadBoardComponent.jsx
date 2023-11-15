import React, { Component } from "react";
import BoardService from "../comunity/BoardService";
import Alert from "react-s-alert";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

const ACCESS_TOKEN = "accessToken";

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

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            comunity: { starpoint: 0.0 },
            attachedFiles: [],
            isLiked: false,
            token: localStorage.getItem(ACCESS_TOKEN),
            newCommentText: "",
            comments: [], // 댓글 목록을 저장할 상태
        };
        this.goToUpdate = this.goToUpdate.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
    }

    handleStarRatingChange = (value) => {
        console.log("Received stars from StarRating:", value);
        // 이제 이 값을 원하는 곳에 사용할 수 있습니다.
        // 예를 들어, state에 저장하거나 다른 처리를 할 수 있습니다.
    };

    componentDidMount() {
        BoardService.getOneBoard(this.state.no)
            .then((res) => {
                if (res && res.data) {
                    this.setState({
                        comunity: res.data,
                        attachedFiles: res.data.attachedFiles,
                    });

                    BoardService.getLikesCount(this.state.no, this.state.token)
                        .then((likesRes) => {
                            if (likesRes && likesRes.data) {
                                this.setState({
                                    isLiked: likesRes.data.recommended,
                                });
                            }
                        })
                        .catch((error) => {
                            console.error("Error getting likes count: ", error);
                        });

                    console.log("get result => " + JSON.stringify(res.data));
                } else {
                    // handle error case
                }
            })
            .catch((error) => {
                console.error("Error getting board data: ", error);
            });

        // 댓글 목록을 가져오는 API 호출
        BoardService.getComments(this.state.no)
            .then((commentsRes) => {
                if (commentsRes && commentsRes.data) {
                    this.setState({
                        comments: commentsRes.data, // 댓글 목록을 상태에 저장
                    });
                }
            })
            .catch((error) => {
                console.error("Error getting comments: ", error);
            });
    }

    returnDate(cTime) {
        return (
            <div className="card">
                <label className="card">
                    <div className="card-body">작성일 : [ {formatDate(cTime)} ]</div>
                </label>
            </div>
        );
    }

    goToList() {
        this.props.history.push("/comunity");
    }

    goToUpdate = () => {
        const { no } = this.state;
        const { userid, nickname } = this.props.location.state;

        this.props.history.push({
            pathname: `/create-comunity/${no}`,
            state: { userid, nickname },
        });
    };

    toggleLike = () => {
        const { no, isLiked } = this.state;
        const userId = this.props.location.state.userid;
        if (isLiked) {
            BoardService.deleteLikeCount(no, userId, this.state.token)
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({
                            isLiked: false,
                        });
                    } else {
                        console.error("Error deleting like count");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting like count:", error);
                });
        } else {
            BoardService.addLikeCount(no, userId, this.state.token)
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({
                            isLiked: true,
                        });
                    } else {
                        console.error("Error adding like count");
                    }
                })
                .catch((error) => {
                    console.error("Error adding like count:", error);
                });
        }
    };

    deleteView = async () => {
        if (window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다.")) {
            BoardService.deleteBoard(this.state.no)
                .then((res) => {
                    console.log("delete result => " + JSON.stringify(res));
                    if (res.status === 200) {
                        this.props.history.push("/comunity");
                    } else {
                        Alert.error("글 삭제가 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting board: ", error);
                    Alert.error("글 삭제 중 오류가 발생했습니다.");
                });
        }
    };

    handleCommentChange = (event) => {
        this.setState({ newCommentText: event.target.value });
    };

    addComment = (event) => {
        event.preventDefault();

        const { no, token, newCommentText } = this.state;
        const userId = this.props.location.state.userid;

        if (!newCommentText) {
            Alert.error("댓글에 내용이 없습니다!");
            return;
        }

        const commentData = {
            userId: userId,
            comunityId: no,
            body: newCommentText,
        };

        BoardService.addComment(commentData, token)
            .then((response) => {
                if (response.status === 200) {
                    this.refreshComments();
                    this.setState({ newCommentText: "" });
                } else {
                    console.error("댓글 추가 중 오류 발생");
                    Alert.error("댓글 추가 중 오류가 발생했습니다.");
                }
            })
            .catch((error) => {
                console.error("댓글 추가 중 오류 발생: ", error);
                Alert.error("댓글 추가 중 오류가 발생했습니다.");
            });
    };

    refreshComments = () => {
        BoardService.getComments(this.state.no)
            .then((commentsRes) => {
                if (commentsRes && commentsRes.data) {
                    this.setState({
                        comments: commentsRes.data,
                    });
                }
            })
            .catch((error) => {
                console.error("댓글 가져오기 중 오류 발생: ", error);
                Alert.error("댓글을 가져오는 중 오류가 발생했습니다.");
            });
    };

    deleteComment = (commentId) => {
        if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            const userId = this.props.location.state.userid;
            BoardService.deleteComment(commentId, userId, this.state.token)
                .then((response) => {
                    if (response.status === 200) {
                        this.refreshComments();
                    } else {
                        console.error("댓글 삭제 중 오류 발생");
                        Alert.error("댓글 삭제 중 오류가 발생했습니다.");
                    }
                })
                .catch((error) => {
                    console.error("댓글 삭제 중 오류 발생: ", error);
                    Alert.error("댓글 삭제 중 오류가 발생했습니다.");
                });
        }
    };

    render() {
        return (
            <div>
                <div className="card col-md-8 offset-md-2">
                    <h3 className="text-center"> Read Detail</h3>
                    <div className="card-body">
                        <div className="card">
                            <label className="card" style={{ paddingLeft: "20px" }}>
                                {" "}
                                빵집 이름{" "}
                            </label>
                            <div className="card-body" style={{ marginLeft: "20px" }}>
                                {this.state.comunity.title}
                            </div>
                        </div>
                        <div className="card">
                            <label className="card" style={{ paddingLeft: "20px" }}>
                                {" "}
                                글 내용{" "}
                            </label>
                            <div className="card-body" value={this.state.comunity.contents} readOnly>
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
                                    {this.state.attachedFiles.map((file, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                className="rounded float-left"
                                                src={`http://localhost:8080/api/comunity/images/${file.storeFilename}`}
                                                alt={`file_${index}`}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div
                                    className="card-body"
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.comunity.contents,
                                    }}
                                ></div>
                            </div>
                            <div>
                                <label className="card" style={{ paddingLeft: "20px" }}>
                                    {" "}
                                    별점{" "}
                                </label>
                                <div className="card-body" style={{ marginLeft: "20px" }}>
                                    <Stack spacing={1}>
                                        {this.state.comunity.starpoint !== null && (
                                            <Rating name="half-rating" value={this.state.comunity.starpoint} precision={0.1} readOnly />
                                        )}
                                    </Stack>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <label className="card" style={{ paddingLeft: "20px" }}>
                                {" "}
                                작성자 :{" "}
                            </label>
                            <div className="card-body" style={{ marginLeft: "20px" }}>
                                {this.state.comunity.nickname}
                            </div>
                        </div>
                        {this.returnDate(this.state.comunity.createdTime)}
                        <div style={{ marginTop: "10px" }}></div>
                        <button className="btn btn-outline-secondary" onClick={this.goToList.bind(this)}>
                            후기 목록
                        </button>

                        {this.props.location.state.userid === this.state.comunity.userid && (
                            <div style={{ display: "inline-block", marginLeft: "10px" }}>
                                <button className="btn btn-outline-secondary" onClick={this.goToUpdate} style={{ marginLeft: "10px" }}>
                                    글 수정
                                </button>
                                <button className="btn btn-outline-secondary" onClick={this.deleteView} style={{ marginLeft: "10px" }}>
                                    글 삭제
                                </button>
                            </div>
                        )}
                        <button
                            className={`btn btn-outline-secondary ${this.state.isLiked ? "active" : ""}`}
                            onClick={this.toggleLike}
                            style={{ marginLeft: "10px" }}
                        >
                            {this.state.isLiked ? "좋아요 취소" : "좋아요"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReadBoardComponent;
