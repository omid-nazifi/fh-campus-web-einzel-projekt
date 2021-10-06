// Bootstrap
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// stylesheet
import '../assets/styles/style.scss';

// resources
import logo_img from '../assets/images/fh_logo.svg';


import { isEmpty, parseJson } from './utils';
import User from './user';



function load3RandomUsers() {
    var count = 3;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        createSlider(this.responseText);
    }
    xhttp.open("GET", "https://randomuser.me/api/?results=" + count, true);
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

load3RandomUsers();