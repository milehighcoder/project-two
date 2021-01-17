// const apiAuth = require("../middleware/apiAuth");
document.addEventListener('DOMContentLoaded', (e) => {
    // const viewBtn = document.getElementById('view-team-button');
    const createBtn = document.getElementById('create-shift-button');
    const editBtn = document.getElementById('edit-button');
    const saveBtn = document.getElementById('save-button');
    const deleteBtn = document.getElementById('delete-shift-button');
    const tdEls = document.querySelectorAll('td');
    const tdArray = Array.from(tdEls);

    const getSchedules = () => {
        console.log("getting schedules")
        fetch('/portal/api/schedule', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiZW1haWwiOiJwYW0uMUBlbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIxLTAxLTE2VDA3OjAyOjE3LjY3NFoifSwiaWF0IjoxNjEwNzgwNTM3fQ.hGXyliNzixfBdxh4opyLGSbNHrtc6csjQxw-vbiShd0'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const schedules = data;
                console.log('Employee Schedules: ', schedules)
            });
    };
    const createSchedule = () => {
        console.log("Creating schedule")
        fetch('/portal/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const schedules = data;
                console.log('Employee Schedules: ', schedules)
                // add function to display schedules
            });
    };
    const updateSchedule = (e) => {
        console.log('updating schedule...')
        // const itemEdit = e.target.children;
        // for (let i = 0; i < itemEdit.length; i++) {
        //     const currentEl = itemEdit[i];
        //     if (currentEl.tagName === 'INPUT') {
        //         currentEl.value = currentEl.parentElement.children[0].innerText;
        //     }
        // }
        console.log("Updating schedules")
        fetch(`/portal/api/schedule/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const schedules = data;
                console.log('Employee Schedules: ', schedules)
                // add function to display schedules
            });
    };
    const deleteSchedule = (e) => {
        e.stopPropagation();
        const { id } = e.target.dataset;

        console.log("Deleting schedule");

        fetch(`/portal/api/schedule/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(getSchedules);
    };

    // viewBtn.addEventListener("click", () => {
    //     console.log("clicked view");
    //     getSchedules();
    // });
    createBtn.addEventListener("click", () => {
        console.log("clicked create");
        createSchedule();
    });
    editBtn.addEventListener("click", () => {
        console.log("clicked edit");
        // console.log(tdArray)
        tdArray.forEach((elem) => {
            elem.setAttribute("contenteditable", true)
            if (elem.className === "day cell-morning-shift") {
                elem.className = "day calendar-edit-blue"
            } else {
                elem.className = "calendar-edit-gray"
            }

        })
        createBtn.style.display = 'none';
        saveBtn.style.display = 'block';


    });
    deleteBtn.addEventListener("click", () => {
        console.log("clicked delete");
        deleteSchedule();
    });
    saveBtn.addEventListener("click", () => {
        console.log("clicked save");
        location.href = "/portal";
        updateSchedule();
    });



});