// const apiAuth = require("../middleware/apiAuth");
document.addEventListener("DOMContentLoaded", (e) => {
  const viewBtn = document.getElementById("view-team-button");
  const createBtn = document.getElementById("create-shift-button");
  const updateBtn = document.getElementById("update-shift-button");
  const deleteBtn = document.getElementById("delete-shift-button");

  const displaySchedules = (schedules) => {
    console.log("displaying schedules: " + JSON.parse(schedules));
    const newTableRow = document.createElement("tr");
    const newEmpCell = document.createElement("td");
    const newDayCell = document.createElement("td");
    const spanTag = document.createElement("span");
    newEmpCell.setAttribute("class", "emp");
    newDayCell.setAttribute("class", "day");
    spanTag.setAttribute("class", "number");
  };

  // const getSchedules = () => {
  //     console.log("getting schedules")
  //     fetch('/portal/api/schedule', {
  //         method: 'GET',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //     })
  //         .then((response) => response.json())
  //         .then((data) => {
  //             // console.log('Employee Schedules: ', data);
  //             const schedules = data;
  //             console.log('Employee Schedules: ', schedules)
  //             // add function to display schedules
  //             displaySchedules(schedules);
  //         });
  // };
  const getSchedules = () => {
    console.log("getting schedules");
    fetch("/portal/api/schedule", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiZW1haWwiOiJwYW0uMUBlbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIxLTAxLTE2VDA3OjAyOjE3LjY3NFoifSwiaWF0IjoxNjEwNzgwNTM3fQ.hGXyliNzixfBdxh4opyLGSbNHrtc6csjQxw-vbiShd0'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const schedules = data;
        console.log("Employee Schedules: ", schedules);
      });
  };
  const createSchedule = () => {
    console.log("Creating schedule");
    fetch("/portal/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const schedules = data;
        console.log("Employee Schedules: ", schedules);
        // add function to display schedules
      });
  };
  const updateSchedule = () => {
    const itemEdit = e.target.children;
    for (let i = 0; i < itemEdit.length; i++) {
      const currentEl = itemEdit[i];
      if (currentEl.tagName === "INPUT") {
        currentEl.value = currentEl.parentElement.children[0].innerText;
      }
    }
    console.log("Updating schedules");
    fetch(`/portal/api/schedule/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const schedules = data;
        console.log("Employee Schedules: ", schedules);
        // add function to display schedules
      });
  };
  const deleteSchedule = (e) => {
    e.stopPropagation();
    const { id } = e.target.dataset;

    console.log("Deleting schedule");

    fetch(`/portal/api/schedule/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(getSchedules);
  };

  // viewBtn.addEventListener("click", () => {
  //     console.log("clicked view");
  //     getSchedules();
  // });
  createBtn.addEventListener("click", () => {
    console.log("clicked create");
    createSchedule();
  });
  updateBtn.addEventListener("click", () => {
    console.log("clicked update");
    updateSchedule();
  });
  deleteBtn.addEventListener("click", () => {
    console.log("clicked delete");
    deleteSchedule();
  });
});
