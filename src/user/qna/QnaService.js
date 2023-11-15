import axios from "axios";

const QNA_API_BASE_URL = "http://localhost:8080/api/qna";

class QnaService {
    getQna(p_num) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.get(QNA_API_BASE_URL + "?p_num=" + p_num, config);
    }

    createQna(qna) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.post(QNA_API_BASE_URL, qna, config);
    }

    getOneQna(no) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.get(QNA_API_BASE_URL + "/" + no, config);
    }

    updateQna(no, qna) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.put(QNA_API_BASE_URL + "/" + no, qna, config);
    }

    deleteQna(no) {
        return axios.delete(QNA_API_BASE_URL + "/" + no);
    }
}

export default new QnaService();
