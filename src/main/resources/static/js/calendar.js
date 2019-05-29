const API_BASE_URL = 'http://localhost:9380/api';
const ACCESS_TOKEN = 'accessToken';

if(localStorage.getItem(ACCESS_TOKEN) === null) {
    window.location.href = "/login";
}


// begin of calendar code

// TODO
// Loading dates of workouts and display them on calendar. Display workouts from database
var eventDates = [1, 10, 12, 22],
    $picker = $('#my-picker'),
    $content = $('#panel'),
    sentences = ["qwerwqerqwer", "asdasdasdasd", "asdasdasdasdas"];
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
            // renderDetails(fd);
        }
        else {
            renderForm(fd);
        }
    }
})
// Select initial date from `eventDates`
var currentDate = currentDate = new Date();
$picker.data('datepicker').selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 10));
function renderForm(date) {
    console.log(date);
    let html =
        "<h2>"+ date +"</h2>" +
        "<form method=\"post\">" +
        "<label for=\"category\">Category: </label>" +
        "<input id=\"category\" type=\"text\" class=\"form-control\" name=\"category\">" +
        "<label>Exercise name: </label>" +
        "<input id=\"name\" type=\"text\" class=\"form-control\" name=\"name\">" +
        "<label>Number of series: </label>" +
        "<input id=\"series\" class=\"form-control\" type=\"number\" name=\"numberOfSeries\" min=\"1\" max=\"15\" onchange=\"renderSeries()\">" +
        "<br>" +
        "<span id=\"series-body\"></span>" +
        "<button id=\"exercise-button\" class=\"btn btn-primary mb-2\" type=\"button\">Submit</button>" +
        "</form>"
    document.getElementById("panel").innerHTML = html;
}
function renderForm2(date) {
    let header = document.createElement("h2");
    header.textContent = date;
    let form = document.createElement("form")
    form.setAttribute('method',"post");
    let p1 = document.createElement("p");
    p1.textContent = "Category: ";
    let i1 = document.createElement("input");
    i1.setAttribute('type', "text");
    i1.setAttribute('name', "category");
    let p2 = document.createElement("p");
    p2.textContent = "Exercise name: ";
    let i2 = document.createElement("input");
    i2.setAttribute('type', "text");
    i2.setAttribute('name', "name");
    let p3 = document.createElement("p");
    p3.textContent = "Number of series: ";
    let i3 = document.createElement("input");
    i3.setAttribute('type', "number");
    i3.setAttribute('name', "numberOfSeries");
    i3.setAttribute('min', "1");
    i3.setAttribute('max', "10");
    i3.setAttribute('onChange', "renderSeriesInput()");
    let button = document.createElement("input");
    button.setAttribute('type', "button");
    button.setAttribute('value', "Submit");
    button.setAttribute('id', "exercise-button");
    form.appendChild(p1);
    form.appendChild(i1);
    form.appendChild(p2);
    form.appendChild(i2);
    form.appendChild(p3);
    form.appendChild(i3);
    form.appendChild(document.createElement("br"));
    form.appendChild(button);
    document.getElementById("panel").appendChild(header);
    document.getElementById("panel").appendChild(form);
}
function renderSeries() {
    let number = document.getElementById("series").value;
    let body = document.getElementById("series-body");
    body.innerHTML="";
    if(number<1) {
        document.getElementById("series").value=1;
    }
    else if(number>15) {
        document.getElementById("series").value=1;
    }
    else {
        for(let i=0; i<number; i++) {
            let p = document.createElement("span");
            p.textContent = "Set "+(parseInt(i)+1)+": ";
            let span1 = document.createElement("span");
            span1.setAttribute('class', "form-check form-check-inline");
            let l1 = document.createElement("label");
            l1.textContent = "Reps: ";
            let i1 = document.createElement("input");
            i1.setAttribute('type',"number");
            i1.setAttribute('min',"1");
            i1.setAttribute('class', "form-control");
            let l2 = document.createElement("label");
            l2.textContent = "Weight: ";
            let i2 = document.createElement("input");
            i2.setAttribute('type',"number");
            i2.setAttribute('min',"1");
            i2.setAttribute('class', "form-control");
            span1.appendChild(l1);
            span1.appendChild(i1);
            span1.appendChild(l2);
            span1.appendChild(i2);
            body.appendChild(p);
            body.appendChild(span1);
        }
    }
}