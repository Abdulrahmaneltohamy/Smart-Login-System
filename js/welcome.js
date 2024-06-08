var spanName = document.getElementById("spanNamee");
var logOutBtn = document.getElementById("logoutButton");

var nameUser = localStorage.getItem("nameWelcome");
nameWelcome.innerHTML = nameUser;


logOutBtn.addEventListener('click', function () {
    localStorage.removeItem("nameWelcome");
})

