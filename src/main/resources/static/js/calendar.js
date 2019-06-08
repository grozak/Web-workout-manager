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

function createExercise(id , exerciseRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id + "/exercise",
        method: 'POST',
        body: JSON.stringify(exerciseRequest)
    });

}

function deleteTraining(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id,
        method: 'DELETE'
    }).then(() => location.reload());
}

function deleteExercise(id, eid) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id + "/exercise/" + eid,
        method: 'DELETE'
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
        request2({
            url: API_BASE_URL + "/training/list",
            method: 'GET'
        }).then(response => {
            response.json().then(json => {
                if(response.ok) {
                    trainingList = json;
                    loadCalendar();
                }
            })
        })
            .catch(error => {
                console.log(error);
            });
    }
}

function getExerciseList(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/training/" + id + "/exercise/list",
        method: 'GET'
    });
}

//begin of calendar code

var categoriesDict = {};
var categoriesOptions='';
var exercisesList = [];
var response;
var responseBody;
var trainingId = -1;
var trainingList;

document.addEventListener("DOMContentLoaded", function() {
    getTrainingList();
});

function loadCalendar() {
    var $picker = $("#my-picker"),
        $content = $('#panel'),
        sentences = ['qwerwqerqwer', 'asdasdasdasd', 'asdasdasdasdas'];
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
            renderForm(fd);
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
        '     <br>' +
        '<button id="add-exercise-button" class="btn btn-success mb-2" type="button" onclick="renderAllExercises();renderForm()">Add exercise</button>' +
        '<button id="delete-training-button" class="btn btn-danger mb-2" type="button" onclick="deleteTraining('+trainingId+')">Delete training</button>' +
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
        '<button id="delete-exercise-button btn-sm ml-2" class="btn btn-danger mb-2 btn-sm" type="button" onclick="deleteExercise('+trainingId+','+v.id+')">Delete</button>' +
        '</div>' +
        '</div>';
    return html;
}

function renderForm(date) {
    //request categories from wger
    if (date == null) {
        date = document.getElementById("date").textContent;
    }
    if(!Object.keys({}).length) {
        const request = new Request('https://wger.de/api/v2/exercisecategory/', {method: 'GET'});
        fetch(request)
            .then(response => response.json())
            .then(categories => {
                for(let i=0; i<categories.results.length; i++) {
                    categoriesDict[categories.results[i].id] = categories.results[i].name;
                    categoriesOptions+='<option name="category">'+ categories.results[i].name +'</option>\n'
                }
                showFormWithCategories(date);
            })
            .catch(error => {
                console.error(error);
            });
    }
    else {
        showFormWithCategories(date);
    }
}

function showFormWithCategories(date) {
    let html =
        '<h2 id="date">'+ date +'</h2>' +
        '<form autocomplete="off" action="">' +
        '<label for="category">Category: </label>' +
        '<select class="form-control form-control-sm" id="categories" onchange="loadExercises()">'+
        categoriesOptions +
        '</select>' +
        '<label>Exercise name: </label>' +
        '<select class="form-control form-control-sm" id="exercises">'+
        '</select>' +
        '<label>Number of series: </label>' +
        '<input id="series" class="form-control" type="number" name="numberOfSeries" min="1" max="15" onchange="renderSeries()">' +
        '<span id="series-body"></span>' +
        '</form>' +
        '<button id="exercise-button" class="btn btn-primary mb-2" type="button" onclick="submit()">Submit</button>'
    document.getElementById('panel').innerHTML = html;
}

function loadExercises() {
    category = document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value;
    categoryId=0;
    for(key in categoriesDict) {
        if(categoriesDict[key] === category) {
            categoryId = key;
            break;
        }
    }
    const firstRequest = new Request('https://wger.de/api/v2/exercise/?language=2&category='+categoryId, {method: 'GET'});
    exercisesList = [];
    fetchExercises(firstRequest);

    function fetchExercises(request) {
        next = ''
        fetch(request)
            .then(response => response.json())
            .then(exercises => {
                for(element in exercises.results) {
                    exercisesList.push(exercises.results[element]);
                }
                if(exercises.next) {
                    fetchExercises(new Request(exercises.next, {method: 'GET'}));
                }
            })
            .then(() => displayExercises())
            .catch(error => {
                console.error(error);
            });
    }

    function displayExercises() {
        html = '';
        for(let i=0; i<exercisesList.length; i++) {
            html+= '<option name="exercise">'+ exercisesList[i].name +'</option>\n'
        }


        document.getElementById("exercises").innerHTML = html;
    }
}

function renderSeries() {
    let number = document.getElementById('series').value;
    let body = document.getElementById('series-body');
    body.innerHTML = '';
    if (number < 1) {
        document.getElementById('series').value = 1;
    }
    else if (number > 15) {
        document.getElementById('series').value = 1;
    }
    else {
        for (let i = 0; i < number; i++) {
            let p = document.createElement('span');
            p.textContent = 'Set ' + (parseInt(i) + 1) + ': ';
            let span1 = document.createElement('span');
            span1.setAttribute('class', 'form-check form-check-inline');
            let l1 = document.createElement('label');
            l1.textContent = 'Reps: ';
            let i1 = document.createElement('input');
            i1.setAttribute('type', 'number');
            i1.setAttribute('min', '1');
            i1.setAttribute('class', 'form-control');
            let l2 = document.createElement('label');
            l2.textContent = 'Weight: ';
            let i2 = document.createElement('input');
            i2.setAttribute('type', 'number');
            i2.setAttribute('min', '1');
            i2.setAttribute('class', 'form-control');
            span1.appendChild(l1);
            span1.appendChild(i1);
            span1.appendChild(l2);
            span1.appendChild(i2);
            body.appendChild(document.createElement('br'));
            body.appendChild(p);
            body.appendChild(span1);
        }
    }
}

function submit() {
    let date = document.getElementById("date").textContent;
    let category = document.getElementById("categories").options[document.getElementById("categories").selectedIndex].value;
    let exercise = document.getElementById("exercises").options[document.getElementById("exercises").selectedIndex].value;
    let numberOfSeries = parseInt(document.getElementById('series').value);
    let reps = [];
    let weights = [];
    let numbers = document.getElementsByTagName('input');
    for(let i=1; i<numbers.length; i++) {
        if(i%2===0) {
            weights.push(parseInt(numbers[i].value));
        }
        else {
            reps.push(parseInt(numbers[i].value));
        }
    }

    if(trainingId<0) {
        const inputs = {
            date: date
        };
        const trainingCreateRequest = Object.assign({}, inputs);
        createTraining(trainingCreateRequest)
            .then(() => {
                trainingId = parseInt(response.headers.get('Location').split('training/')[1])

            })
            .then(() => postExercise());

        document.getElementById("preview").innerHTML = '<h4>Added exercises:</h4>';
    }
    else {
        postExercise();
    }

    function postExercise() {
        const inputs = {
            category: category,
            name: exercise,
            numberOfSeries: numberOfSeries,
            numberOfReiteration: reps,
            weights: weights
        };
        const exerciseRequest = Object.assign({}, inputs);
        createExercise(trainingId , exerciseRequest);

        // Add exercise to preview and reset form
        document.getElementById("preview").innerHTML+=generateExerciseCard(inputs);
        showFormWithCategories(document.getElementById("date").textContent);
    }
}