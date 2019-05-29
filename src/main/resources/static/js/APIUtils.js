// import { API_BASE_URL, ACCESS_TOKEN} from "./constants.js"; TODO not working for some reason
const API_BASE_URL = 'http://localhost:9380/api';
const ACCESS_TOKEN = 'accessToken';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        });
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

// const inputs = {
//     email: email,
//     password: password
// };
//
// const loginRequest = Object.assign({}, inputs);

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

// const inputs = {
//     name: name,
//     email: email,
//     password: password
// };
//
// const signUpRequest = Object.assign({}, inputs);

export function signup(signUpRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signUpRequest)
    });
}

export function logout() {
    return request({
        url: API_BASE_URL + "/auth/logout",
        method: 'GET'
    });
}

export function getTrainingList() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/list",
        method: 'GET'
    });
}

export function getTraining(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id,
        method: 'GET'
    });
}

export function createTraining() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training",
        method: 'POST'
    });

}

// const inputs = {
//     date: date,
//     exercises: exercises
// };
//
// const trainingUpdateRequest = Object.assign({}, inputs);

export function updateTraining(id, trainingUpdateRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id,
        method: 'PUT',
        body: JSON.stringify(trainingUpdateRequest)
    });
}

export function deleteTraining(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id,
        method: 'DELETE'
    });
}

export function getExerciseList(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id + "/exercise/list",
        method: 'GET'
    });
}

export function getExercise(id, eid) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id + "/exercise/" + eid,
        method: 'GET'
    });
}

// const inputs = {
//     category: category,
//     name: name,
//     numberOfSeries: numberOfSeries,
//     numberOfReiteration: numberOfReiteration,
//     weights: weights
// };
//
// const exerciseRequest = Object.assign({}, inputs);

export function createExercise(id , exerciseRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id + "/exercise",
        method: 'POST',
        body: JSON.stringify(exerciseRequest)
    });

}

// const inputs = {
//     category: category,
//     name: name,
//     numberOfSeries: numberOfSeries,
//     numberOfReiteration: numberOfReiteration,
//     weights: weights
// };
//
// const exerciseRequest = Object.assign({}, inputs);

export function updateExercise(id, eid, exerciseRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id + "/exercise/" + eid,
        method: 'PUT',
        body: JSON.stringify(exerciseRequest)
    });
}

export function deleteExercise(id, eid) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id + "/exercise/" + eid,
        method: 'DELETE'
    });
}