const API_BASE_URL = 'http://localhost:9380/api';
const ACCESS_TOKEN = 'accessToken';

// if(localStorage.getItem(ACCESS_TOKEN) !== null) {
//     window.location.href = "/calendar";
// }

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

function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

function loginButton() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const inputs = {
        email: email,
        password: password
    };

    const loginRequest = Object.assign({}, inputs);

    login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            console.log("Logged in successfully.");
            console.log(response);
            window.location.href = "/calendar";
        }).catch(error => {
            console.log("Please try again :(");
            console.log(error);
        })
}
