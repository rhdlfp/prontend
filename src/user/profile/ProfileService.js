import axios from "axios";

const Profile_API = "http://localhost:8080";

class ProfileService {
    getProfile(p_num) {
        const config = {
            headers: {
                "content-type": "multipart/form-data; charset=utf-8",
            },
        };
        return axios.get(Profile_API + "?p_num=" + p_num, config);
    }

    getPaymentList(id) {
        return axios.get(Profile_API + "/payment/list/" + id);
    }

    getBuyList(id) {
        return axios.get(Profile_API + "/payment/buylist/" + id);
    }
}
export default new ProfileService();
