const apiAuth = require("../middleware/apiAuth");
document.addEventListener('DOMContentLoaded', (e) => {
    const viewBtn = document.getElementById('view-team-button');
    const createBtn = document.getElementById('create-shift-button');
    const updateBtn = document.getElementById('update-shift-button');
    const deleteBtn = document.getElementById('delete-shift-button');

    const displaySchedules = (schedules) => {
        let parsed = JSON.stringify(schedules)
        console.log(parsed)
        console.log(schedules);
    }

    const getSchedules = () => {
        console.log("getting schedules")
        fetch('/portal/api/schedule', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': { token }
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Employee Schedules: ', data);
                const schedules = data;
                console.log('Employee Schedules: ', schedules)
                // add function to display schedules
                displaySchedules(schedules);
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
                // console.log('Employee Schedules: ', data);
                const schedules = data;
                console.log('Employee Schedules: ', schedules)
                // add function to display schedules
            });
    };
    const updateSchedule = () => {
        const itemEdit = e.target.children;
        for (let i = 0; i < itemEdit.length; i++) {
            const currentEl = itemEdit[i];
            if (currentEl.tagName === 'INPUT') {
                currentEl.value = currentEl.parentElement.children[0].innerText;

            }
        }
        console.log("Updating schedules")
        fetch('/portal/api/schedule', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Employee Schedules: ', data);
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

    viewBtn.addEventListener("click", () => {
        console.log("clicked view");
        getSchedules();
    });
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