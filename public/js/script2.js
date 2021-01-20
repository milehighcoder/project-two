// MODAL START
var modal = document.getElementsByClassName("modal");
var btn = document.getElementsByClassName("myBtn");
var span = document.getElementsByClassName("close");

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
  console.log(startTime);
  alert("You've clocked in at: " + startTime);
  durationTime();
}
function stopTimer() {
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
document.getElementById("sunday-switch").onchange = function () {
  // document.getElementById("sun-start").disabled = !this.checked;
  document.getElementById("sun-start").value = "";
};

const sunStart = document.getElementById("sun-stop").innerHTML;

console.log(sunStart);

//create check function
function check() {
  let inputs = document.getElementById("sunday-switch");
  inputs.checked = true;
}

window.onload = function () {
  window.addEventListener("load", check, false);
};
