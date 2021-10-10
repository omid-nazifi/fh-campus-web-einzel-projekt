require("../scripts/app");
import { isEmpty, parseJson } from './utils';

// function init() {
//     var forms = document.querySelectorAll('.needs-validation')
//     forms.forEach(function (input, index, array) {
//         input.addEventListener('submit', function (event) {
//             if (!input.checkValidity()) {
//                 event.preventDefault()
//                 event.stopPropagation()
//             }

//             input.classList.add('was-validated')
//         }, false)
//     });

// }

function init() {
    var forms = document.querySelectorAll('.needs-validation')
    forms.forEach(function (input, index, array) {
        input.addEventListener('submit', function (event) {
            if (!checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            input.classList.add('was-validated')
        }, false)
    });

}

function checkValidity() {
    let isValidated = true;
    let forms = document.getElementById("contactForm").querySelectorAll("input");

    forms.forEach(function (input) {
        if (!validateField(input)) {
            input.closest("div").classList.remove("form-valid");
            input.closest("div").classList.add("form-invalid");
            isValidated = false;
        } else {
            input.closest("div").classList.remove("form-invalid");
            input.closest("div").classList.add("form-valid");
        }
    });

    return isValidated;
}

function validateField(field) {
    let isValid = false;
    let id = field.getAttribute("id");
    let type = field.getAttribute("type");
    let required = field.hasAttribute("required");

    if (field.value === "") {
        if (!required) {
            return true;
        } else {
            return false;
        }
    }

    if (type === "text") {
        if (id == "description") {
            isValid = field.length <= 250;
        } else {
            let nameRegex = new RegExp(/^[a-z\-]+$/i);
            isValid = nameRegex.test(field.value);
        }
    } else if (type === "email") {
        // pattern="(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
        let emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        isValid = emailRegex.test(field.value);
    } else if (type === "tel") {
        // pattern="/^(00|\+)\d{1,3} \d{7,11}"
        let telRegex = new RegExp(/^[\+]?[0-9]+$/i);
        isValid = telRegex.test(field.value);
    }
    return isValid;
}

function addToContactList() {
    let contactList = document.getElementById("contactList");
    let contactCounter = document.getElementById("contactCounter");


    let fname = document.getElementById("firstName");
    let lname = document.getElementById("lastName");
    let email = document.getElementById("email");
    let tel = document.getElementById("tel");

    let htmlContent = `
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">`+ (fname.value + " " + lname.value) + `</h6>
                <small class="text-muted">`+ email.value + `</small><br/>
                <small class="text-muted">`+ tel.value + `</small>
            </div>
        </li>
    `;

    contactList.innerHTML += htmlContent;
    contactCounter.innerHTML = contactList.querySelectorAll("li").length;
    resetForm();
}

function resetForm() {
    let forms = document.getElementById("contactForm").querySelectorAll("input");

    forms.forEach(function (input, index, array) {
        input.closest("div").classList.remove("form-valid");
        input.closest("div").classList.remove("form-invalid");
        input.value = "";
    });
}

init();