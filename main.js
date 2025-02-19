// This is the function that triggers each time an input is made

function updateStrength() {
  let password = document.getElementById("password").value;
  let result = checkPasswordStrength(password);
  let bar = document.getElementById("bar");
  let feedback = document.getElementById("feedback");
  document.getElementById("result").innerHTML = "";

  // This updates the colored bar to indicate the strength of the password
  bar.className = "";
  if (result.strengthLabel === "Blank") {
    bar.classList.add("blank");
    responseBox.style.display = "none";
  }
  if (result.strengthLabel === "Weak") {
    bar.classList.add("weak");
    responseBox.style.display = "block";
  }
  if (result.strengthLabel === "Medium") {
    bar.classList.add("medium");
    responseBox.style.display = "block";
  }
  if (result.strengthLabel === "Strong") {
    bar.classList.add("strong");
    responseBox.style.display = "block";
  }

  // Uses the feedback array made (below) with a line break in between each entry
  feedback.innerHTML =
    result.strengthLabel + "<br>" + result.feedback.join("<br>");
}

function checkPasswordStrength(password) {
  let strength = 0;
  let feedback = [];

  if (password.length >= 8) strength++;
  else feedback.push("<br>Must be at least 8 characters.");
  if (/[a-z]/.test(password)) strength++;
  else feedback.push("<br>Needs at least one lowercase letter.");
  if (/[A-Z]/.test(password)) strength++;
  else feedback.push("<br>Needs at least one uppercase letter.");
  if (/[0-9]/.test(password)) strength++;
  else feedback.push("<br>Needs at least one number.");
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  else feedback.push("<br>Needs at least one special character.");
  if (/\s/.test(password)) {
    feedback.push("<br>Invalid! Password cannot contain spaces.");
  }

  function labelCalculate() {
    if (strength == 5) {
      return 3;
    } else if (strength == 3 || strength == 4) {
      return 2;
    } else if (strength == 1 || strength == 2) {
      return 1;
    } else {
      return 0;
    }
  }

  let strengthLabel = ["Blank", "Weak", "Medium", "Strong"][labelCalculate()];

  return { strengthLabel, feedback };
}

// This creates a text below the main section that displays a suggestion when the form is submitted (with the enter key)
document
  .getElementById("passwordForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let x = document.getElementById("password").value;
    let result = checkPasswordStrength(x);

    if (x === "") {
      document.getElementById("result").innerHTML = "";
      return false;
    } else if (result.strengthLabel === "Weak") {
      document.getElementById("result").innerHTML =
        "This password is pretty weak! The password would be okay for low security accounts like a home computer. Try adding some of the suggestions on the top right!";
      return false;
    } else if (result.strengthLabel === "Medium") {
      document.getElementById("result").innerHTML =
        "This password is okay, but can use improvement! It would be okay for low security accounts like social media. Try adding some of the suggestions on the top right!";
      return false;
    } else {
      document.getElementById("result").innerHTML =
        "This password is strong! It should be safe to use in high security accounts like online banking. But be sure to use different passwords for different services!";
      return true;
    }
  });

// This creates a toggle to show or hide the password. It converts the passwordField variable to a "text" or "password" type
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    let passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  });

let modal = document.getElementById("customModal");
let openModalBtn = document.getElementById("openModal");
let closeModalBtn = document.querySelector(".close");
