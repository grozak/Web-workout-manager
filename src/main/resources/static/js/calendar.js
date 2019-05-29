const API_BASE_URL = 'http://localhost:9380/api';
const ACCESS_TOKEN = 'accessToken';

if(localStorage.getItem(ACCESS_TOKEN) === null) {
    window.location.href = "/login";
}

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
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

function logout() {
    return request({
        url: API_BASE_URL + "/auth/logout",
        method: 'GET'
    });
}

function logoutButton() {
    logout()
        .then(response => {
            localStorage.removeItem(ACCESS_TOKEN);
            console.log("Logged out successfully.");
            console.log(response);
            window.location.href = "/login"
        }).catch(error => {
            console.log("Please try again :(");
            console.log(error);
        })
}