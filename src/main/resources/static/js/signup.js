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

function signup(signUpRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signUpRequest)
    });
}

function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const inputs = {
        name: name,
        email: email,
        password: password
    };

    const signUpRequest = Object.assign({}, inputs);

    signup(signUpRequest)
        .then(response => {
            console.log("Registered successfully.");
            console.log(response);
            window.location.href = "/login";
        }).catch(error => {
            console.log("Please try again :(");
            console.log(error);
        })
}