//* global var
var signupNameInput = document.getElementById("signupName");
var signupMailInput = document.getElementById("signupMail");
var signupPasswordInput = document.getElementById("signupPassword");
var signInMailInput = document.getElementById("signInMail");
var signInPasswordInput = document.getElementById("signInPassword");
var alertMailMessageInput = document.getElementById("mailExist")

var allUserData = [];
if (localStorage.getItem("userDataContainer") !== null) {
    allUserData = JSON.parse(localStorage.getItem("userDataContainer"))
}


// * Sign Up page ---------------

// 1- validate SignUp Data
function signupMailValidate() {
    var alertMessage = document.getElementById("msgeMail")
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var userMailValidate = signupMailInput.value;
    if (regex.test(userMailValidate) == true) {
        alertMessage.classList.add("d-none")
        return true;
    } else {
        alertMessage.classList.remove("d-none")
    }
}

// 2- to creat data and add it in array&local storage
function addUserData() {
    if (signupMailValidate() == true) {
        var userData = {
            userName: signupNameInput.value,
            userMail: signupMailInput.value,
            userPassword: signupPasswordInput.value
        }
        allUserData.push(userData);
        localStorage.setItem("userDataContainer", JSON.stringify(allUserData));
        document.getElementById("exist").innerHTML = '<span class=" text-success fw-bold">Success .. Wait 5 seconds to go to Login page</span>'
        setTimeout(function () {
            window.location.href = "./index.html";
        }, 5000);
    }
}

// 3- check mail is exist or no
function isMailExist() {
    for (var i = 0; i < allUserData.length; i++) {
        if (allUserData[i].userMail.toLowerCase() == signupMailInput.value.toLowerCase()) {
            return false;
        }
    }
}


// 4- check input is empty or no
function isInputEmpty() {
    if (signupNameInput.value == "" || signupMailInput.value == "" || signupPasswordInput.value == "") {
        return false;
    } else {
        return true;
    }
}

// 5- to sign up
function signUp() {

    // 1-when user add data empty
    if (isInputEmpty() == false) {
        document.getElementById("exist").innerHTML = '<span class=" text-danger fw-bold">All inputs is required</span>'
        return false;
    }

    // 3-when user add same mail again
    if (isMailExist() == false) {
        alertMailMessageInput.classList.remove("d-none")
    }
    // 4-when user add new mail
    else {
        addUserData();
    }

    clearForm();
}

// 6- to clear form
function clearForm() {
    signupNameInput.value = null;
    signupMailInput.value = null;
    signupPasswordInput.value = null;
}

// ---------------------------------------------

//* sign in page

//  1- check input is empty or no
function isSigninInputEmpty() {
    if (signInMailInput.value == "" || signInPasswordInput.value == "") {
        return false;
    } else {
        return true;
    }
}

//  2- check mail and password is correct , and keep user name to show it in welcome page
function isLoginInputCorrect(loginMail, loginPassword) {
    for (var i = 0; i < allUserData.length; i++) {
        if (allUserData[i].userMail.toLowerCase() == loginMail.toLowerCase() && allUserData[i].userPassword.toLowerCase() == loginPassword.toLowerCase()) {
            localStorage.setItem("nameWelcome", allUserData[i].userName);
            return true;
        }
    }
}

// 3- to sign in
function signIn() {
    // 1-when user add data empty
    if (isSigninInputEmpty() == false) {
        document.getElementById("signinExist").innerHTML = `<span class=" text-danger fw-bold">All inputs is required</span>`
        return false;
    }

    // 2-when user add incorrect mail or password
    var loginMail = signInMailInput.value;
    var loginPassword = signInPasswordInput.value;
    // correct inputs
    if (isLoginInputCorrect(loginMail, loginPassword) == true) {
        window.location.href = "./welcome.html";
    }
    // incorrect inputs
    else {
        document.getElementById("signinExist").innerHTML = `<span class=" text-danger fw-bold">incorrect email or password</span>`;
    }
}

