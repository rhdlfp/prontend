import React, { Component } from "react";
import BoardService from "./BoardService";
import "../comunity/comunity.css";
import { Pagination } from "@mui/material";
import bakery from "../../home/HomeComponents/HomeImg/bakery.png";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

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

class ReviewList extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            p_num: 1,
            paging: {},
            comunity: [], // 게시물 목록
            attachedFiles: [],
            likesCounts: {}, // 게시물별 좋아요 수를 저장할 객체
            token: localStorage.getItem(ACCESS_TOKEN),
            isOverlayVisible: false,
        };

        console.log(this.state);

        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        BoardService.getOneBoard(this.state.no)
            .then((res) => {
                if (res && res.data) {
                    this.setState({
                        comunity: res.data,
                        attachedFiles: res.data.attachedFiles,
                    });
                    // 여기서 getLikesCount를 호출하여 recommended 값을 얻고 상태를 업데이트합니다.
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
                }
            })
            .catch((error) => {});
        console.log(this.state.attachedFiles);
        this.loadBoardsWithLikes(this.state.p_num);
    }

    loadBoardsWithLikes(p_num) {
        // 좋아요 카운트를 가져올 게시물 ID들을 저장할 배열
        const comunityIds = [];

        BoardService.getBoards(p_num)
            .then((res) => {
                if (res && res.data) {
                    const comunityList = res.data.list;

                    // 게시물 목록을 업데이트
                    this.setState({
                        p_num: res.data.pagingData.currentPageNum,
                        paging: res.data.pagingData,
                        comunity: comunityList,
                    });

                    // 각 게시물의 ID를 배열에 저장
                    comunityList.forEach((comunityItem) => {
                        comunityIds.push(comunityItem.id);
                    });

                    // 좋아요 수 가져오기
                    this.getLikesCounts(comunityIds);
                }
            })
            .catch((error) => {
                console.error("게시물을 불러오는 중 오류가 발생했습니다.", error);
            });
    }

    // 좋아요 수를 가져오는 함수 (여러 게시물에 대한 좋아요 수를 가져오도록 수정)
    getLikesCounts = (ids) => {
        ids.forEach((id) => {
            BoardService.getLikesCount(id, this.state.token)
                .then((res) => {
                    if (res.data && res.data.recommendNum !== undefined) {
                        const updatedComunity = this.state.comunity.map((comunityItem) => {
                            if (comunityItem.id === id) {
                                return {
                                    ...comunityItem,
                                    likes: res.data.recommendNum, // 좋아요 수 업데이트
                                };
                            }
                            return comunityItem;
                        });

                        this.setState({
                            comunity: updatedComunity,
                        });
                    }
                })
                .catch((error) => {
                    console.error("좋아요 수를 가져오는 중 오류가 발생했습니다.", error);
                });
        });
    };

    createBoard() {
        this.props.history.push({
            pathname: "/create-comunity/_create",
            state: {
                userid: this.props.currentUser.id,
                nickname: this.props.currentUser.nickname,
            },
        });
    }

    readBoard(id) {
        this.incrementCounts(id);
        this.props.history.push({
            pathname: `/read-comunity/${id}`,
            state: {
                userid: this.props.currentUser.id,
                nickname: this.props.currentUser.nickname,
            },
        });
    }

    incrementCounts = (id) => {
        BoardService.incrementCounts(id).then((res) => {
            if (res.status === 200) {
                this.listBoard(this.state.p_num);
            } else {
            }
        });
    };

    listBoard(p_num) {
        console.log("pageNum : " + p_num);
        BoardService.getBoards(p_num)
            .then((res) => {
                // 게시물 목록을 업데이트
                this.setState({
                    p_num: res.data.pagingData.currentPageNum,
                    paging: res.data.pagingData,
                    comunity: res.data.list,
                });

                // 좋아요 수를 가져오는 함수 호출
                this.getLikesCounts(res.data.list.map((comunityItem) => comunityItem.id));
            })
            .catch((error) => {
                console.error("게시물을 불러오는 중 오류가 발생했습니다.", error);
            });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++) {
            pageNums.push(i);
        }

        return pageNums.map((page) => (
            <li className="page-item" key={page.toString()}>
                <a className="page-link" onClick={() => this.listBoard(page)}>
                    {page}
                </a>
            </li>
        ));
    }

    isPagingPrev() {
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard(this.state.paging.currentPageNum - 1)} tabIndex="-1">
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
                    <a className="page-link" onClick={() => this.listBoard(this.state.paging.currentPageNum + 1)} tabIndex="-1">
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
                    <a className="page-link" onClick={() => this.listBoard(1)} tabIndex="-1">
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
                    <a className="page-link" onClick={() => this.listBoard(this.state.paging.pageNumCountTotal)} tabIndex="-1">
                        LastPage({this.state.paging.pageNumCountTotal})
                    </a>
                </li>
            );
        }
    }
    showOverlay = () => {
        this.setState({ isOverlayVisible: true });
    };

    // 오버레이를 닫는 함수
    closeOverlay = () => {
        this.setState({ isOverlayVisible: false });
    };

    render() {
        return (
            <div className="container">
                <h2 className="text-left" style={{ marginTop: "20px" }}>
                    {" "}
                    후기
                </h2>
                <div className="row"></div>
                <div className="row">
                    <div className="col-md-12 h-auto d-flex flex-row flex-wrap justify-content-center ">
                        {this.state.comunity.map((comunity, index) => {
                            return (
                                comunity.title === this.props.bakeryName && (
                                    <div
                                        id="cardList"
                                        className="card"
                                        style={{
                                            width: "20rem",
                                            margin: "50px 20px 0 0",
                                            transition: "0.3s",
                                            borderRadius: "10px",
                                        }}
                                        key={index}
                                    >
                                        {comunity.attachedFiles.length > 0 ? (
                                            <img
                                                className="card-img-top"
                                                src={`http://localhost:8080/api/comunity/images/${comunity.attachedFiles[0].storeFilename}`}
                                                alt={`file_0`}
                                                style={{ height: "200px" }}
                                            />
                                        ) : (
                                            <img className="card-img-top" src={bakery} alt="file_0" style={{ height: "200px" }} />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a onClick={() => this.readBoard(comunity.id)}>{comunity.title}</a>
                                            </h5>
                                            <p>{comunity.contents}</p>
                                            <p className="card-text">{formatDate(comunity.createdTime)}</p>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <p>
                                                    <Stack spacing={1}>
                                                        {comunity.starpoint !== null && (
                                                            <Rating name="half-rating" value={comunity.starpoint} precision={0.1} readOnly />
                                                        )}
                                                    </Stack>
                                                    <span role="img" aria-label="Heart emoji">
                                                        ❤️{comunity.likes}
                                                    </span>
                                                </p>
                                                <p>조회수{comunity.counts}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>

                <div className="row">
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination
                            count={this.state.paging.pageNumCountTotal}
                            page={this.state.p_num}
                            onChange={(event, value) => this.listBoard(value)}
                            color="primary"
                            showFirstButton
                            showLastButton
                            shape="rounded"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewList;
