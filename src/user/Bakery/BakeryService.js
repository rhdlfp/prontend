import axios from "axios";

const BAKERY_API_BASE_URL = "http://localhost:8080/bakeries";
const BAKERY_API = "http://localhost:8080";

class BakeryService {
    getBakery(p_num) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.get(BAKERY_API_BASE_URL + "?p_num=" + p_num, config);
    }

    getOneBakery(no) {
        return axios.get(BAKERY_API_BASE_URL + "/" + no);
    }

    getAllBakery() {
        return axios.get(BAKERY_API_BASE_URL + "/all");
    }

    createBakery(bakery) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.post(BAKERY_API_BASE_URL, bakery, config);
    }
}
export default new BakeryService();
