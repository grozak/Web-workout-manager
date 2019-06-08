const ACCESS_TOKEN = 'accessToken';

if(localStorage.getItem(ACCESS_TOKEN) !== null) {
    window.location.href = "/calendar";
}