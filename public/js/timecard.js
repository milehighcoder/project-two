document.addEventListener("DOMContentLoaded", (e) => {
  const clockIn = document.getElementById("clockIn");
  const clockOut = document.getElementById("clockOut");

  const userSchedule = document.getElementById("user-schedule");
  document.getElementById("today-date").innerHTML = new Date().toDateString();

  const mainTime = document.getElementById("main-time");

  const today = new Date(); // get today's date
  const firstDayOfCurrentWeek = today.getDate() - today.getDay(); // firstDayOfCurrentWeek day is the day of the month - the day of the week
  const lastDayOfCurrentWeek = firstDayOfCurrentWeek + 6; // lastDayOfCurrentWeek day is the first day + 6

  const getProperDate = (date) =>
    new Date(date).toDateString().split(" ").slice(1, -1).join(" ");

  const weekStartTimeStamp = new Date(
    today.setDate(firstDayOfCurrentWeek)
  ).setHours(0, 0, 0, 0);
  const weekEndTimeStamp = new Date(
    today.setDate(lastDayOfCurrentWeek)
  ).setHours(23, 59, 59, 999);

  mainTime.innerHTML =
    getProperDate(weekStartTimeStamp) + " - " + getProperDate(weekEndTimeStamp);

  const getSchedule = () => {
    fetch("/getUserWeek", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("UnAuthorized");
        }
      })
      .then((data) => {
        console.log("Got the Data: ", data);
        const liNodes = Object.keys(data).map((day) => {
          const li = document.createElement("li");
          li.innerHTML = day + ": " + data[day] + " hours";
          return li;
        });
        const totalLiNode = document.createElement("li");
        const totalHours = Object.keys(data).reduce(
          (acc, item) => acc + data[item],
          0
        );
        totalLiNode.innerHTML = "Total : " + totalHours + " hours";
        liNodes.push(totalLiNode);

        userSchedule.innerHTML = null;
        liNodes.forEach((node) => userSchedule.appendChild(node));
      })
      .catch((error) => {
        if (error.message === "UnAuthorized") {
          location.href = "/";
        }
      });
  };

  getSchedule();
});

var intervalId = setInterval(() => {
  const date = new Date();

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  document.getElementById("timer").innerHTML =
    hours + ":" + minutes + ":" + seconds;
}, 1000);

window.addEventListener("unload", () => {
  clearInterval(intervalId);
});
