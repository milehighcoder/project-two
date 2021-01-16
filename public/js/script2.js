var display = document.getElementById("timer");
var secs = 0;
var mins = 0;
var hrs = 0;
var h = "";
var m = "";
var s = "";
var timer;

// START MODAL SCRIPT |||||||||||||||||||||||||||

// Get the modal
var modal = document.getElementsByClassName("modal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks the button, open the modal
btn[0].onclick = function () {
  modal[0].style.display = "block";
};

btn[1].onclick = function () {
  modal[1].style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span[0].onclick = function () {
  modal[0].style.display = "none";
};

span[1].onclick = function () {
  modal[1].style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// END MODAL SCRIPT |||||||||||||||||||||||||||||||

function startTimer(btn) {
  btn.setAttribute("disabled", "disabled");
  durationTime();
}
function stopTimer() {
  document
    .getElementsByClassName("button button-rounded-hover")[0]
    .removeAttribute("disabled");
  clearTimeout(timer);
}
function resetTimer() {
  document
    .getElementsByClassName("button button-rounded-hover")[0]
    .removeAttribute("disabled");
  clearTimeout(timer);
  display.innerHTML = "00:00:00";
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
  display.innerHTML = h + ":" + m + ":" + s;
  durationTime();
}
function durationTime() {
  if (hrs != 99) {
    timer = setTimeout(countTimer, 100);
  }
}
