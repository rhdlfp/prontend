import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

const request = (options) => {
    const headers = new Headers({
        "Content-Type": "application/json",
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append("Authorization", "Bearer " + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options).then((response) =>
        response.json().then((json) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: "GET",
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: "POST",
        body: JSON.stringify(loginRequest),
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: "POST",
        body: JSON.stringify(signupRequest),
    });
}

export function updateUser(updateRequest) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const userId = updateRequest.id;

    return request({
        url: API_BASE_URL + "/user/update/" + userId,
        method: "PUT",
        body: JSON.stringify(updateRequest),
    });
}

export function changePassword(changepassRequest) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const userId = changepassRequest.id;

    return request({
        url: API_BASE_URL + "/user/changePassword/" + userId,
        method: "PUT",
        body: JSON.stringify(changepassRequest),
    });
}

export function findPassMail(findpasswordRequest) {
    return request({
        url: API_BASE_URL + "/auth/findpassword",
        method: "POST",
        body: JSON.stringify(findpasswordRequest),
    });
}

export function checkEmail(email) {
    return request({
        url: API_BASE_URL + "/auth/emailcheck/" + email,
        method: "GET",
    });
}

export function uploadProfileImageApi(imageData) {
    return request({
        url: API_BASE_URL + "/api/user/uploadImage",
        method: "POST",
        body: imageData,
        headers: {
            Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
        },
    });
}

export function getbakery(id) {
    return request({
        url: API_BASE_URL + "/bakeries/" + id,
        method: "GET",
    });
}
