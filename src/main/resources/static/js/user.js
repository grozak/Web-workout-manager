const API_BASE_URL = 'http://localhost:9380/api';
const ACCESS_TOKEN = 'accessToken';

if(localStorage.getItem(ACCESS_TOKEN) === null) {
    window.location.href = '/login';
}

let friendList = [];
let notFriendList = [];
let pendingInvitations = [];
let mostActiveUsers = [];

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
};

function logout() {
    request({
        url: API_BASE_URL + "/auth/logout",
        method: 'GET'
    }).then(response => {
        response.json().then(json => {
            if(response.ok){
                if(json.success){
                    console.log(json.message);
                    localStorage.removeItem(ACCESS_TOKEN);
                    window.location.href = "/login";
                }
            }
        })
    })
}

function getUserFriends() {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        request({
            url: API_BASE_URL + "/user/friendlist",
            method: 'GET'
        }).then(response => {
            response.json().then(json => {
                if(response.ok) {
                    friendList = json
                }
                renderFriendList();
            })
        }).catch(error => {
            console.log(error);
            friendList = [];
        });
    }
}

function getUserNotFriends() {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        request({
            url: API_BASE_URL + "/user/list",
            method: 'GET'
        }).then(response => {
            response.json().then(json => {
                if(response.ok) {
                    notFriendList = json
                }
                renderNotFriendList();
            })
        }).catch(error => {
            console.log(error);
            notFriendList = [];
        });
    }

}

function getPendingInvitations() {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        request({
            url: API_BASE_URL + "/invitation/list",
            method: 'GET'
        }).then(response => {
            response.json().then(json => {
                if(response.ok) {
                    pendingInvitations = json
                }
                renderPendingInvitations();
            })
        }).catch(error => {
            console.log(error);
            pendingInvitations = [];
        });
    }
}

function getMostActiveUsers(count) {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        request({
            url: API_BASE_URL + "/user/most-active?count=" +count ,
            method: 'GET'
        }).then(response => {
            response.json().then(json => {
                if(response.ok) {
                    mostActiveUsers = json
                }
                renderMostActiveUsers();
            })
        }).catch(error => {
            console.log(error);
            mostActiveUsers = [];
        });
    }
}

function renderFriendList() {
    // console.log(friendList);
    let friendContainer = document.getElementById("friend-container");
    if(friendList.length === 0){
        let noFriends = document.createElement('p');
        noFriends.innerText = "Your friend list is empty :(";
        friendContainer.appendChild(noFriends);
    }
}

function renderNotFriendList() {
    console.log(notFriendList);
    let notFriendContainer = document.getElementById("not-friend-container");
    if(notFriendList.length === 0){
        let allFriends = document.createElement('p');
        allFriends.setAttribute('class', 'mx-auto');
        allFriends.innerText = "You are a friend of everyone !";
        notFriendContainer.appendChild(allFriends)
    } else {
        let notFriendUl = document.createElement('ul');
        notFriendUl.setAttribute('class', 'list-group mx-auto mb-3');
        for(let i=0; i<notFriendList.length; i++) {
            let notFriendLi = document.createElement('li');
            notFriendLi.setAttribute('class', 'list-group-item');
            notFriendLi.setAttribute('style', 'border: 1px solid #007bff!important;');
            notFriendLi.innerText = notFriendList[i].name;
            let plusImage = document.createElement('img');
            plusImage.setAttribute('class', 'ml-2 float-right');
            plusImage.setAttribute('src', '/images/plus.png');
            notFriendLi.appendChild(plusImage);
            notFriendUl.appendChild(notFriendLi);
        }
        notFriendContainer.appendChild(notFriendUl);
    }
}

function renderPendingInvitations() {
    // console.log(pendingInvitations);
    let invitationContainer = document.getElementById("invitation-container");
    if(pendingInvitations.length === 0){
        let noInvitation = document.createElement('p');
        noInvitation.setAttribute('class', 'mx-auto');
        noInvitation.innerText = "You have no pending invitations :(";
        invitationContainer.appendChild(noInvitation);
    }
}

function renderMostActiveUsers() {
    // console.log(mostActiveUsers);
    let mostActiveUsersContainer = document.getElementById("active-users-container");
    for (let i=0; i<mostActiveUsers.length; i++) {
        let userCol = document.createElement('div');
        userCol.setAttribute('class', 'col-sm text-center border border-primary rounded mx-2 pt-3');
        userCol.setAttribute('id', mostActiveUsers[i].user.email);
        userCol.innerHTML = "<h4>" + mostActiveUsers[i].user.name + "</h4><p>Training count: " + mostActiveUsers[i].trainingCount + "</p>";
        mostActiveUsersContainer.appendChild(userCol);
    }



}

document.addEventListener("DOMContentLoaded", function() {
    // getUserFriends();
    // getUserNotFriends();
    // getPendingInvitations();
    getMostActiveUsers(3);
});

