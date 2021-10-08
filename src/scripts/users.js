require("../scripts/app");
import { isEmpty, parseJson } from './utils';
import User from './user';

// global variables
let userCount = 100;
let nationality = "";
let gender = "";

function init() {
    loadRandomUsers();

    window.filterByCount = filterByCount;
    window.filterByNationality = filterByNationality;
    window.filterByGender = filterByGender;
}

function loadRandomUsers() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        createSlider(this.responseText);
    }
    
    xhttp.open("GET", "https://randomuser.me/api/?&results=" + userCount + "&nat=" + nationality + "&gender=" + gender, true);
    xhttp.send();
}

function createSlider(response) {
    // Javascript function JSON.parse to parse JSON data
    var jsonObj = parseJson(response);
    if (jsonObj !== null) {
        var htmlContent = "";
        jsonObj.results.forEach((item, i) => {
            var name = item.name.title + ". " + item.name.first + " " + item.name.last;
            var user = new User(item.id, name, item.email, item.gender, item.phone, item.picture.large);   

            var isActive = i == 1 ? true : false;
            htmlContent += createSlid(user, isActive);
        });
        document.getElementById('UserList').innerHTML = htmlContent;
    }
}

function createSlid(user, isActive) {
    const active = isActive == true ? "active" : ""; 
    return "<div class='col-lg-4'>" +
    "<svg class='bd-placeholder-img rounded-circle' width='140' height='140' xmlns='http://www.w3.org/2000/svg'" +
      "role='img' aria-label='Placeholder: 140x140' preserveAspectRatio='xMidYMid slice' focusable='false'><title>Placeholder</title>" +
      "<image href='" + user.picture + "' height='140' width='140'/>" +
    "</svg>" +
    "<h2>" + user.name + "</h2>" +
    "<p>Email: " + user.email + "</p>" +
    "<p><a class='btn btn-secondary' href='pricing.html'>View details &raquo;</a></p>" +
  "</div>";
}

function filterByCount() {
    var input = document.getElementById('userCount');
    if (input.value) {
        userCount = input.value;
    } else {
        userCount = 100
    }
    loadRandomUsers();
}

function filterByNationality() {
    var input = document.getElementById('userNat');
    if (input.value) {
        nationality = input.value;
    } else {
        nationality = ""
    }
    loadRandomUsers();
}

function filterByGender() {
    var input = document.getElementById('userGender');
    if (input.value) {
        gender = input.value;
    } else {
        gender = ""
    }
    loadRandomUsers();
}

init();