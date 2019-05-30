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
    });
}
//begin of calendar code

var categoriesDict = {};
var categoriesOptions='';
var exercisesList = [];


// TODO
// Loading dates of workouts and display them on calendar. Display workouts from database
var eventDates = [1, 10, 12, 22],
    $picker = $("#my-picker"),
    $content = $('#panel'),
    sentences = ['qwerwqerqwer', 'asdasdasdasd', 'asdasdasdasdas'];
$picker.datepicker({
    language: 'en',
    dateFormat: 'dd-mm-yyyy',
    onRenderCell: function (date, cellType) {
        var currentDate = date.getDate();
        // Add extra element, if `eventDates` contains `currentDate`
        if (cellType === 'day' && eventDates.indexOf(currentDate) !== -1) {
            return {
                html: currentDate + '<span class="dp-note"></span>'
            }
        }
    },
    onSelect: function onSelect(fd, date) {
        // If date with event is selected, show it
        if (date && eventDates.indexOf(date.getDate()) !== -1) {
            renderTrainingPreview(fd);
        }
        else {
            renderForm(fd);
        }
    }
})

function renderTrainingPreview(date) {
    html =
        '<h2>'+ date +'</h2>\n' +
        '<h4>Your training: </h4>\n' +
        '<div class="row">\n' +
        '  <div>\n' +
        '    <div class="list-group" id="list-tab" role="tablist">' +
        '      <a class="list-group-item list-group-item-action" id="list-exercise-1" data-toggle="list" href="javascript:void(0)" onclick="updatePreview(1)">Exercise1asdasdasxdxddxdxdxdxdasdasdasddas</a>\n' +
        '      <a class="list-group-item list-group-item-action" id="list-exercise-2" data-toggle="list" href="javascript:void(0)" onclick="updatePreview(2)">Exercise2</a>\n' +
        '      <a class="list-group-item list-group-item-action" id="list-exercise-3" data-toggle="list" href="javascript:void(0)" onclick="updatePreview(3)">Exercise3</a>\n' +
        '      <a class="list-group-item list-group-item-action" id="list-exercise-4" data-toggle="list" href=javascript:void(0)" onclick="updatePreview(4)">Exercise4</a>' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>';
    document.getElementById("preview").innerHTML = '';
    document.getElementById('panel').innerHTML = html;
}

function updatePreview(number) {
    let previous = document.getElementsByClassName("list-group-item list-group-item-action active");
    if(previous.length !==0) {
        previous[0].className = "list-group-item list-group-item-action";
    }
    document.getElementById("list-exercise-"+number).className = "list-group-item list-group-item-action active";
    html =
        '<br>' +
        '<h4>Exercise '+ number + '</h4>\n' +
        '<p>Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker</p>'

    document.getElementById("preview").innerHTML = html;
}

function renderForm(date) {
    //request categories from wger
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
        '<h2>'+ date +'</h2>' +
        '<form method="post">' +
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
        '<button id="exercise-button" class="btn btn-primary mb-2" type="button">Submit</button>' +
        '</form>'
    document.getElementById('panel').innerHTML = html;
}

function loadExercises() {
    console.log('load exercise');
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
        console.log('1');
        fetch(request)
            .then(response => response.json())
            .then(exercises => {
                for(element in exercises.results) {
                    exercisesList.push(exercises.results[element]);
                }
                if(exercises.next) {
                    console.log(exercises.next);
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
