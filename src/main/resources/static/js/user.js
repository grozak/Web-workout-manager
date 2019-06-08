const API_BASE_URL = '/api';
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
    let friendContainer = document.getElementById("friend-container");
    while(friendContainer.firstChild) {
        friendContainer.removeChild(friendContainer.firstChild);
    }
    if(friendList.length === 0){
        let noFriends = document.createElement('p');
        noFriends.innerText = "Your friend list is empty :(";
        friendContainer.appendChild(noFriends);
    } else {
        let friendUl = document.createElement('ul');
        friendUl.setAttribute('class', 'list-group mx-auto mb-3');
        for (let i=0; i<friendList.length; i++) {
            let friendLi = document.createElement('li');
            friendLi.setAttribute('class', 'list-group-item');
            friendLi.innerText = friendList[i].name + ' - ' + friendList[i].email;
            let eyeImage = document.createElement('img');
            eyeImage.setAttribute('class', 'ml-2 float-right');
            eyeImage.setAttribute('src', '/images/eye.png');
            eyeImage.setAttribute('onclick', 'goToFriend(' + friendList[i].id + ');');
            let deleteImage = document.createElement('img');
            deleteImage.setAttribute('class', 'ml-2 float-right');
            deleteImage.setAttribute('src', '/images/delete.png');
            deleteImage.setAttribute('onclick', 'deleteFriend(' + friendList[i].id + ');');
            friendLi.appendChild(deleteImage);
            friendLi.appendChild(eyeImage);
            friendUl.appendChild(friendLi);
        }
        friendContainer.appendChild(friendUl);
    }
}

function goToFriend(id) {
    window.location.href='/calendar/'+id;
}

function deleteFriend(id) {
    request({
        url: API_BASE_URL + '/user/' + id,
        method: 'DELETE'
    }).then(response => {
        response.json().then(json => {
            if(response.ok) {
                friendList = friendList.filter(item => item.id !== id);
                renderFriendList();
                getUserNotFriends();
            }
        })
    }).catch(error => {
        console.log(error);
    })
}

function renderNotFriendList() {
    let notFriendContainer = document.getElementById("not-friend-container");
    while(notFriendContainer.firstChild) {
        notFriendContainer.removeChild(notFriendContainer.firstChild);
    }
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
            notFriendLi.innerText = notFriendList[i].name;
            let plusImage = document.createElement('img');
            plusImage.setAttribute('class', 'ml-2 float-right');
            plusImage.setAttribute('src', '/images/plus.png');
            plusImage.setAttribute('onclick', 'sendInvitation(' + notFriendList[i].id + ');');
            notFriendLi.appendChild(plusImage);
            notFriendUl.appendChild(notFriendLi);
        }
        notFriendContainer.appendChild(notFriendUl);
    }
}

function sendInvitation(id) {
    request({
        url: API_BASE_URL + '/invitation/' + id,
        method: 'POST'
    }).then(response => {
        response.json().then(json => {
            if(response.ok) {
                notFriendList = notFriendList.filter(item => item.id !== id);
                renderNotFriendList();
            }
        })
    }).catch(error => {
        console.log(error);
    })
}

function renderPendingInvitations() {
    let invitationContainer = document.getElementById("invitation-container");
    while(invitationContainer.firstChild) {
        invitationContainer.removeChild(invitationContainer.firstChild);
    }
    if(pendingInvitations.length === 0){
        let noInvitation = document.createElement('p');
        noInvitation.setAttribute('class', 'mx-auto');
        noInvitation.innerText = "You have no pending invitations :(";
        invitationContainer.appendChild(noInvitation);
    } else {
        let invitationsUl = document.createElement('ul');
        invitationsUl.setAttribute('class', 'list-group mx-auto mb-3');
        for (let i=0; i<pendingInvitations.length; i++) {
            let invitationsLi = document.createElement('li');
            invitationsLi.setAttribute('class', 'list-group-item');
            invitationsLi.innerText = pendingInvitations[i].user1.name;
            let plusImage = document.createElement('img');
            plusImage.setAttribute('class', 'ml-2 float-right');
            plusImage.setAttribute('src', '/images/plus.png');
            plusImage.setAttribute('onclick', 'answerToInvitation(' + pendingInvitations[i].id + ', ' + true + ');');
            let minusImage = document.createElement('img');
            minusImage.setAttribute('class', 'ml-2 float-right');
            minusImage.setAttribute('src', '/images/minus.png');
            minusImage.setAttribute('onclick', 'answerToInvitation(' + pendingInvitations[i].id + ', ' + false + ');');
            invitationsLi.appendChild(minusImage);
            invitationsLi.appendChild(plusImage);
            invitationsUl.appendChild(invitationsLi);
        }
        invitationContainer.appendChild(invitationsUl);
    }
}

function answerToInvitation(id, isAccepted) {
    const inputs = {
        isAccepted: isAccepted
    };
    const invitationRequest = Object.assign({}, inputs);
    request({
        url: API_BASE_URL + '/invitation/' + id,
        method: 'PUT',
        body: JSON.stringify(invitationRequest)
    }).then(response => {
        response.json().then(json => {
            if(response.ok) {
                pendingInvitations = pendingInvitations.filter(item => item.id !== id);
                renderPendingInvitations();
                if(isAccepted) {
                    getUserFriends();
                } else {
                    getUserNotFriends();
                }
            }
        })
    }).catch(error => {
        console.log(error);
    })
}

function renderMostActiveUsers() {
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
    getUserFriends();
    getUserNotFriends();
    getPendingInvitations();
    getMostActiveUsers(3);
});
