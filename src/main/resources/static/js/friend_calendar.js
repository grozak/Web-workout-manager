const API_BASE_URL = 'http://localhost:9380/api';
const ACCESS_TOKEN = 'accessToken';

if(localStorage.getItem(ACCESS_TOKEN) === null) {
    window.location.href = '/login';
}

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(resp => {
            response = resp;
            resp.json().then(json => {
                if(!resp.ok) {
                    return Promise.reject(json);
                }
                responseBody = json;
                return json;
            })
        });
};

const request2 = (options) => {
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

function createTraining(trainingCreateRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/training",
        method: 'POST',
        body: JSON.stringify(trainingCreateRequest)
    });
}

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
    });
}

function getTrainingList() {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        id = window.location.href.split('/calendar/')[1];
        request2({
            url: API_BASE_URL + "/user/"+id,
            method: 'GET'
        }).then(response => {
            response.json().then(json => {
                if(response.ok) {
                    trainingList = json.trainingList;
                    loadCalendar();
                }
            })
        })
            .catch(error => {
                console.log(error);
            });
    }
}

//begin of calendar code
var response;
var responseBody;
var trainingId = -1;
var trainingList;
var exerciseId;

document.addEventListener("DOMContentLoaded", function() {
    getTrainingList();
});

function loadCalendar() {
    var $picker = $("#my-picker");
    $picker.datepicker({
        language: 'en',
        dateFormat: 'dd-mm-yyyy',
        onRenderCell: function (date, cellType) {
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            if(cellType === 'day'){
                for(k in trainingList) {
                    v = trainingList[k];
                    date = v.date;
                    parts = date.split('-');
                    if(day===parseInt(parts[2]) && month===parseInt(parts[1])-1 && year===parseInt(parts[0])) {
                        return {
                            html: day + '<span class="dp-note"></span>'
                        }
                    }
                }
            }

        },
        onSelect: function onSelect(fd, date) {
            // If date with event is selected, show it
            trainingId = -1;
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            for(k in trainingList) {
                v = trainingList[k];
                date = v.date;
                parts = date.split('-');
                if(day===parseInt(parts[2]) && month===parseInt(parts[1])-1 && year===parseInt(parts[0])) {
                    renderTrainingPreview(fd);
                    return;
                }
            }
            document.getElementById("preview").innerHTML='';
        }
    });
}

function renderTrainingPreview(date) {
    parts = date.split('-');
    day = parts[0];
    month = parts[1];
    year = parts[2];
    list = '';
    exercises = [];
    for(k in trainingList) {
        v = trainingList[k];
        parts = v.date.split('-');
        trainingDay = parts[2];
        trainingMonth = parts[1];
        trainingYear = parts[0];
        if(day === trainingDay && month === trainingMonth && year === trainingYear) {
            exercises = v.exerciseList;
            trainingId = v.id;
            break;
        }
    }

    list = '';
    for(let i=0;i<exercises.length; i++) {
        v = exercises[i];
        list += '<a class="list-group-item list-group-item-action" id="list-exercise-'+i+'" data-toggle="list" href="javascript:void(0)" onclick="updatePreview('+i+')">'+v.name+'</a>';
    }

    html =
        '<h2 id="date">'+ date +'</h2>\n' +
        '<h4>Your training: </h4>\n' +
        '<div class="row">\n' +
        '  <div>\n' +
        '    <div class="list-group" id="list-tab" role="tablist">' +
        '<a class="list-group-item list-group-item-action" id="list-exercise-all" data-toggle="list" href="javascript:void(0)" onclick="renderAllExercises(exercises)">All exercises</a>' +
        list +
        '    </div>\n' +
        '  </div>\n' +
        '</div>';
    document.getElementById("preview").innerHTML = '';
    document.getElementById('panel').innerHTML = html;
    renderAllExercises();
}

function updatePreview(number) {
    let previous = document.getElementsByClassName("list-group-item list-group-item-action active");
    if(previous.length !==0) {
        previous[0].className = "list-group-item list-group-item-action";
    }
    document.getElementById("list-exercise-"+number).className = "list-group-item list-group-item-action active";

    exercise = exercises[number];
    document.getElementById("preview").innerHTML = generateExerciseCard(exercise);
}

function renderAllExercises() {
    let previous = document.getElementsByClassName("list-group-item list-group-item-action active");
    if(previous.length !==0) {
        previous[0].className = "list-group-item list-group-item-action";
    }
    document.getElementById("list-exercise-all").className = "list-group-item list-group-item-action active";
    html='';
    for(k in exercises) {
        html+=generateExerciseCard(exercises[k]);
    }
    document.getElementById("preview").innerHTML = html;
}

function generateExerciseCard(exercise) {
    eid = exercise.id;
    if(!eid) {
        eid = exerciseId;
    }

    html =
        '<div class="card mb-2">' +
        '<div class="card-body">'+
        '<h4 class="card-title">' + exercise.name + '</h4>\n' +
        '<h6 class="card-subtitle mb-2">Category: ' + exercise.category + '</h6>' +
        '<table class="table table-sm table-striped">' +
        '  <thead>' +
        '    <tr>' +
        '      <th scope="col">Set number</th>' +
        '      <th scope="col">Reps</th>' +
        '      <th scope="col">Weight</th>' +
        '    </tr>' +
        '  </thead>' +
        '  <tbody>';
    for(let i=0; i<exercise.weights.length; i++) {
        html+=
            '<tr>' +
            '  <td>Set '+(parseInt(i)+1)+'</td>' +
            '  <td>'+exercise.numberOfReiteration[i] +'</td>' +
            '  <td>'+exercise.weights[i] +'</td>' +
            '</tr>';
    }
    html+=
        '  </tbody>' +
        '</table>' +
        '</div>' +
        '</div>';
    return html;
}