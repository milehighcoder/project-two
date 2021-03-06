// MODAL START
var modal = document.getElementsByClassName("modal");
var btn = document.getElementsByClassName("myBtn");
var span = document.getElementsByClassName("close");

const clockInButton = document.getElementById("clock-in-button");
const clockOutButton = document.getElementById("clock-out-button");

const storedStartTime = sessionStorage.getItem("startTime");
if (storedStartTime) {
  startTime = new Date(storedStartTime);
  clockInButton.disabled = true;
  clockInButton.classList.toggle("clock-in-out-disabled");
  clockOutButton.removeAttribute("disabled");
} else {
  clockOutButton.disabled = true;
  clockInButton.removeAttribute("disabled");
  clockOutButton.classList.toggle("clock-in-out-disabled");
}

// clockInButton.removeAttribute("disabled");
// clockInButton.classList.toggle("clock-in-out-disabled");

btn[0].onclick = function () {
  modal[0].style.display = "block";
};

btn[1].onclick = function () {
  modal[1].style.display = "block";
};

btn[2].onclick = function () {
  modal[2].style.display = "block";
};

span[0].onclick = function () {
  modal[0].style.display = "none";
};

span[1].onclick = function () {
  modal[1].style.display = "none";
};

span[2].onclick = function () {
  modal[2].style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// MODAL END

// DROPDOWN MENU START
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
// DROPDOWN MENU END

// TIME CARD START
var display = document.getElementById("timer");
var secs = 0;
var mins = 0;
var hrs = 0;
var h = "";
var m = "";
var s = "";
var timer;
var startTime;

function formatDateString(datetime) {
  var dateString = datetime.toISOString();
  dateString = dateString.replace("T", " ");
  dateString = dateString.substr(0, dateString.indexOf("."));
  return dateString;
}

function startTimer(btn) {
  btn.setAttribute("disabled", "disabled");
  startTime = new Date();
  sessionStorage.setItem("startTime", startTime);
  console.log(startTime);
  alert("You've clocked in at: " + startTime);
  durationTime();
  clockInButton.disabled = true;
  clockInButton.classList.toggle("clock-in-out-disabled");
  clockOutButton.removeAttribute("disabled");
  clockOutButton.classList.toggle("clock-in-out-disabled");
}
function stopTimer() {
  clockInButton.removeAttribute("disabled");
  clockInButton.classList.toggle("clock-in-out-disabled");
  clockOutButton.disabled = true;
  clockOutButton.classList.toggle("clock-in-out-disabled");
  document
    .getElementsByClassName("button button-rounded-hover")[0]
    .removeAttribute("disabled");
  clearTimeout(timer);
}

const postTimeEntry = () => {
  const endTime = new Date();
  const duration =
    (new Date(endTime).getTime() - new Date(startTime).getTime()) /
    (1000 * 60 * 60);
  alert(
    "You've clocked out at: " +
      endTime +
      "\nTotal duration is your shift was : " +
      parseFloat(duration).toFixed(2) +
      " hours"
  );
  const data = {
    start_timestamp: formatDateString(startTime),
    end_timestamp: formatDateString(endTime),
  };
  console.log("data", data);
  fetch("/timeCard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("UnAuthorized");
      }
    })
    .catch((error) => {
      if (error.message === "UnAuthorized") {
        // TODO re-enable
        //location.href = "/";
      }
    });
};

function resetTimer() {
  sessionStorage.removeItem("startTime");
  postTimeEntry();
  document
    .getElementsByClassName("button button-rounded-hover")[0]
    .removeAttribute("disabled");
  console.log(secs);
  console.log(mins);
  console.log(hrs);
  clearTimeout(timer);

  // display.innerHTML = "00:00:00";
  secs = 0;
  mins = 0;
  hrs = 0;
  h = "";
  m = "";
  s = "";

  console.log(timer);
}
function countTimer() {
  secs++;
  if (secs >= 60) {
    secs = 0;
    mins++;
    if (mins >= 60) {
      mins = 0;
      hrs++;
    }
  }
  h = hrs ? (hrs > 9 ? hrs : "0" + hrs) : "00";
  m = mins ? (mins > 9 ? mins : "0" + mins) : "00";
  s = secs > 9 ? secs : "0" + secs;
  // display.innerHTML = h + ":" + m + ":" + s;
  durationTime();
}
function durationTime() {
  if (hrs != 99) {
    timer = setTimeout(countTimer, 100);
  }
}
// TIME CARD END

// CREATE SCHEDULE SWITCH
//SUNDAY
document.getElementById("sunday-switch").onchange = function () {
  document.getElementById("sun-start").value = "";
  document.getElementById("sun-stop").value = "";
};

function checkSunday() {
  // toggles on when input fields are clicked
  let inputs = document.getElementById("sunday-switch");
  inputs.checked = true;
  // toggles off and empties input fields when switch is clicked
  document.getElementById("sunday-switch").onchange = function () {
    document.getElementById("sun-start").value = "";
    document.getElementById("sun-stop").value = "";
  };
  // toggles off if clicked outside input fields
  document.getElementById("Modal3").addEventListener(
    "click",
    (e) => {
      if (document.getElementById("sun-start").value.length == 0) {
        let inputs = document.getElementById("sunday-switch");
        if (!e.target.closest(".sunday")) {
          inputs.checked = false;
        }
      }
    },
    false
  );
}
//MONDAY
document.getElementById("monday-switch").onchange = function () {
  document.getElementById("mon-start").value = "";
  document.getElementById("mon-stop").value = "";
};

function checkMonday() {
  // toggles on when input fields are clicked
  let inputs = document.getElementById("monday-switch");
  inputs.checked = true;
  // toggles off and empties input fields when switch is clicked
  document.getElementById("monday-switch").onchange = function () {
    document.getElementById("mon-start").value = "";
    document.getElementById("mon-stop").value = "";
  };
  // toggles off if clicked outside input fields
  document.getElementById("Modal3").addEventListener(
    "click",
    (e) => {
      if (document.getElementById("mon-start").value.length == 0) {
        let inputs = document.getElementById("monday-switch");
        if (!e.target.closest(".monday")) {
          inputs.checked = false;
        }
      }
    },
    false
  );
}
//TUESDAY
document.getElementById("tuesday-switch").onchange = function () {
  document.getElementById("tues-start").value = "";
  document.getElementById("tues-stop").value = "";
};

function checkTuesday() {
  // toggles on when input fields are clicked
  let inputs = document.getElementById("tuesday-switch");
  inputs.checked = true;
  // toggles off and empties input fields when switch is clicked
  document.getElementById("tuesday-switch").onchange = function () {
    document.getElementById("tues-start").value = "";
    document.getElementById("tues-stop").value = "";
  };
  // toggles off if clicked outside input fields
  document.getElementById("Modal3").addEventListener(
    "click",
    (e) => {
      if (document.getElementById("tues-start").value.length == 0) {
        let inputs = document.getElementById("tuesday-switch");
        if (!e.target.closest(".tuesday")) {
          inputs.checked = false;
        }
      }
    },
    false
  );
}

//WEDNESDAY
document.getElementById("wednesday-switch").onchange = function () {
  document.getElementById("wed-start").value = "";
  document.getElementById("wed-stop").value = "";
};

function checkWednesday() {
  // toggles on when input fields are clicked
  let inputs = document.getElementById("wednesday-switch");
  inputs.checked = true;
  // toggles off and empties input fields when switch is clicked
  document.getElementById("wednesday-switch").onchange = function () {
    document.getElementById("wed-start").value = "";
    document.getElementById("wed-stop").value = "";
  };
  // toggles off if clicked outside input fields
  document.getElementById("Modal3").addEventListener(
    "click",
    (e) => {
      if (document.getElementById("wed-start").value.length == 0) {
        let inputs = document.getElementById("wednesday-switch");
        if (!e.target.closest(".wednesday")) {
          inputs.checked = false;
        }
      }
    },
    false
  );
}
//THURSDAY
document.getElementById("thursday-switch").onchange = function () {
  document.getElementById("thur-start").value = "";
  document.getElementById("thur-stop").value = "";
};

function checkThursday() {
  // toggles on when input fields are clicked
  let inputs = document.getElementById("thursday-switch");
  inputs.checked = true;
  // toggles off and empties input fields when switch is clicked
  document.getElementById("thursday-switch").onchange = function () {
    document.getElementById("thur-start").value = "";
    document.getElementById("thur-stop").value = "";
  };
  // toggles off if clicked outside input fields
  document.getElementById("Modal3").addEventListener(
    "click",
    (e) => {
      if (document.getElementById("thur-start").value.length == 0) {
        let inputs = document.getElementById("thursday-switch");
        if (!e.target.closest(".thursday")) {
          inputs.checked = false;
        }
      }
    },
    false
  );
}
//FRIDAY
document.getElementById("friday-switch").onchange = function () {
  document.getElementById("fri-start").value = "";
  document.getElementById("fri-stop").value = "";
};

function checkFriday() {
  // toggles on when input fields are clicked
  let inputs = document.getElementById("friday-switch");
  inputs.checked = true;
  // toggles off and empties input fields when switch is clicked
  document.getElementById("friday-switch").onchange = function () {
    document.getElementById("fri-start").value = "";
    document.getElementById("fri-stop").value = "";
  };
  // toggles off if clicked outside input fields
  document.getElementById("Modal3").addEventListener(
    "click",
    (e) => {
      if (document.getElementById("fri-start").value.length == 0) {
        let inputs = document.getElementById("friday-switch");
        if (!e.target.closest(".friday")) {
          inputs.checked = false;
        }
      }
    },
    false
  );
}
//SATURDAY
document.getElementById("saturday-switch").onchange = function () {
  document.getElementById("sat-start").value = "";
  document.getElementById("sat-stop").value = "";
};

function checkSaturday() {
  // toggles on when input fields are clicked
  let inputs = document.getElementById("saturday-switch");
  inputs.checked = true;
  // toggles off and empties input fields when switch is clicked
  document.getElementById("saturday-switch").onchange = function () {
    document.getElementById("sat-start").value = "";
    document.getElementById("sat-stop").value = "";
  };
  // toggles off if clicked outside input fields
  document.getElementById("Modal3").addEventListener(
    "click",
    (e) => {
      if (document.getElementById("sat-start").value.length == 0) {
        let inputs = document.getElementById("saturday-switch");
        if (!e.target.closest(".saturday")) {
          inputs.checked = false;
        }
      }
    },
    false
  );
}

// window.onload = function () {
//   window.addEventListener('load', check, false);
// }
