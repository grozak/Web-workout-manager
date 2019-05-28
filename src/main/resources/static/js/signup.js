// if (authenticated ) then eedirect //TODO
//

import {signup} from "./APIUtils";

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
            window.location.href = "/login";
        }).catch(error => {
            console.log("Please try again :(");
    })


}