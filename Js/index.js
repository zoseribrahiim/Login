var LogName = document.querySelector("#LogName");
var Logemail = document.querySelector("#Logemail");
var LogPass = document.querySelector("#LogPass");
var inputs = Array.from(document.querySelectorAll(".log"));
//////////////////////////////////////////////////
var btnLog = document.querySelector("#btnLog");
/////////////////////////////////////////////////
var messagefail = document.querySelector(".messagefail");
var emailmessage = document.querySelector(".emailmessage");
////////////////////////////////////////////////////////////
var accountS = [];
// =======================================================
// ====================== Log In =========================
// =======================================================
function valid(element) {
  var regex = {
    LogName: /.{3,}$/i,
    Logemail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    LogPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (eventInfo) {
    valid(eventInfo.target);
  });
}

if (localStorage.getItem("accounts") !== null) {
  accountS = JSON.parse(localStorage.getItem("accounts"));
}

// localStorage.clear();

btnLog.addEventListener("click", function (eventInfo) {
  if (LogName.value == "" || Logemail.value == "" || LogPass.value == "") {
    messagefail.classList.remove("d-none");
    messagefail.innerHTML = "All inputs are <b>Required</b>";
    emailmessage.classList.add("d-none");
  } else {
    messagefail.classList.add("d-none");
    if (valid(LogName) && valid(Logemail) && valid(LogPass)) {
      if (exist()) {
        emailmessage.classList.remove("d-none");
        messagefail.classList.replace("d-block", "d-none");
      } else {
        console.log(LogName.value + " " + LogPass.value + " " + Logemail.value);
        var account = {
          LogName: LogName.value,
          LogPass: LogPass.value,
          Logemail: Logemail.value,
        };
        accountS.push(account);
        localStorage.setItem("accounts", JSON.stringify(accountS));
        clear();
        signUp()
      }
    } else {
      messagefail.classList.remove("d-none");
      messagefail.innerHTML = "registration is <b>in</b>valid";
      emailmessage.classList.add("d-none");
    }
  }
});

function clear() {
  LogName.value = "";
  Logemail.value = "";
  LogPass.value = "";

  email.value = "";
  Password.value = "";

  LogName.classList.remove("is-invalid");
  LogName.classList.remove("is-valid");
  LogName.nextElementSibling.classList.add("d-none");

  Logemail.classList.remove("is-invalid");
  Logemail.classList.remove("is-valid");
  Logemail.nextElementSibling.classList.add("d-none");

  LogPass.classList.remove("is-invalid");
  LogPass.classList.remove("is-valid");
  LogPass.nextElementSibling.classList.add("d-none");

  emailmessage.classList.add("d-none");
  messagefail.classList.add("d-none");

  email.classList.remove("is-invalid");
  email.classList.remove("is-valid");

  Password.classList.remove("is-valid");
  Password.classList.remove("is-invalid");
  btnSign.nextElementSibling.classList.add("d-none");
}

function exist() {
  for (let j = 0; j < accountS.length; j++) {
    if (Logemail.value === accountS[j].Logemail) {
      return true;
    }
  }
}

// ====================================================
// =========================button=====================
// ====================================================

function signUp() {
  document.querySelector("#signUp").style.display = "block";
  document.querySelector("#login").style.display = "none";
  document.querySelector("#home").style.display = "none";

  document.title ="Sign Up";
}
function login() {
  document.querySelector("#signUp").style.display = "none";
  document.querySelector("#login").style.display = "block";
  document.querySelector("#home").style.display = "none";
  
  document.title="Log In";
}

function home() {
    document.querySelector("#signUp").style.display = "none";
    document.querySelector("#login").style.display = "none";
    document.querySelector("#home").style.display = "block";
    
    document.title="Hello World";

    clear()
    document.querySelector('.type').innerHTML =localStorage.getItem("currentUser");
  }

document.querySelector(".anqure").addEventListener("click", function () {
  signUp();
});
document.querySelector(".loog").addEventListener("click", function () {
  login();
});

document.querySelector(".logOut").addEventListener("click", function () {
    localStorage.removeItem("currentUser"); 
    login();
  });

window.onload = login();

// ==============================================================
// ==========================Sign Up=============================
// ==============================================================

var email = document.querySelector("#email");
var Password = document.querySelector("#Password");
///////////////////////////////////////////////////
var btnSign = document.querySelector("#btnSign");
var sign = Array.from(document.querySelectorAll(".sign"));
////////////////////////////////////////////////////////////

function validation(element) {
  var regex = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

for (let j = 0; j < sign.length; j++) {
  sign[j].addEventListener("input", function (eventInfo) {
    validation(eventInfo.target);
  });
}

btnSign.addEventListener("click", function (eventInfo) {
  if (email.value == "" || Password.value == "") {
    btnSign.nextElementSibling.classList.remove("d-none");
    btnSign.nextElementSibling.innerHTML = "All inputs are <b>Required</b>";
  } else {
    if (validation(email) && validation(Password)) {
      if (existEmail()) {
        home();
        clear();
      } else {
        btnSign.nextElementSibling.classList.remove("d-none");
        btnSign.nextElementSibling.innerHTML = "Email or Password is not valid";
      }
    } else {
      btnSign.nextElementSibling.classList.remove("d-none");
      btnSign.nextElementSibling.innerHTML = "Email or Password is not valid";
    }
  }
});

function existEmail() {
  for (let x = 0; x < accountS.length; x++) {
    if (
      accountS[x].Logemail === email.value &&
      accountS[x].LogPass === Password.value
    ) {
        localStorage.setItem("currentUser",accountS[x].LogName);
        return true;
    }
  }
}

// ============================================================
// ============================= Home =========================
// ============================================================