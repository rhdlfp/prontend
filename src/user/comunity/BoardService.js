import axios from "axios";

const BOARD_API_BASE_URL = "http://localhost:8080/api/comunity";
const BOARD_API = "http://localhost:8080";

class BoardService {
    getBoards(p_num) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num, config);
    }

    createBoard(comunity) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.post(BOARD_API_BASE_URL, comunity, config);
    }

    getOneBoard(no) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.get(BOARD_API_BASE_URL + "/" + no, config);
    }

    updateBoard(no, comunity) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.put(BOARD_API_BASE_URL + "/" + no, comunity, config);
    }

    deleteBoard(no) {
        return axios.delete(BOARD_API_BASE_URL + "/" + no);
    }

    incrementCounts(no) {
        return axios.put(BOARD_API_BASE_URL + "/incrementCounts/" + no);
    }

    getLikesCount(id, token) {
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        return axios.get(BOARD_API + "/heart/list?id=" + id, config);
    }

    addLikeCount(no, userId, token) {
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        const requestData = {
            userId: userId,
            comunityId: no,
        };

        return axios.post(BOARD_API + "/heart/addlike", requestData, config);
    }

    deleteLikeCount(no, userId, token) {
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        return axios.delete(BOARD_API + `/heart/deletelike?userId=${userId}&comunityId=${no}`, config);
    }

    getComments(no) {
        return axios.get(BOARD_API + `/comment/list?id=${no}`);
    }

    addComment(commentData, token) {
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        return axios.post(BOARD_API + "/comment/add", commentData, config);
    }

    deleteComment(commentId, userId, token) {
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        return axios.delete(BOARD_API + `/comment/delete?userId=${userId}&id=${commentId}`, config);
    }
}
export default new BoardService();
