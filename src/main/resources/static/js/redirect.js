// import {ACCESS_TOKEN} from "./constants.js"; TODO Not working for some reason

const ACCESS_TOKEN = 'accessToken';

function getUrlParameter(name) {
    const url = new URL(window.location.href);
    const result = url.searchParams.get(name);

    return result === null ? '' : result
}

const token = getUrlParameter('token');
const error = getUrlParameter('error');

if(token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    window.location.href = "/calendar";
} else {
    window.location.href = "/login";
}