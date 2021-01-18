// const apiAuth = require("../middleware/apiAuth");
document.addEventListener('DOMContentLoaded', (e) => {
    const createBtn = document.getElementById('create-shift-button');
    const editBtn = document.getElementById('edit-button');
    const saveBtn = document.getElementById('save-button');
    const addBtn = document.getElementById('add-button');
    const deleteBtn = document.getElementById('delete-shift-button');
    const tdEls = document.querySelectorAll('td');
    const modal2 = document.getElementById('Modal2-content');
    const outerModal = document.getElementById('Modal2')
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
                // console.log('Employee Schedules: ', schedules)
            });
    };

    const createSchedule = () => {
        const inputEls = document.querySelectorAll('input');
        console.log(inputEls)

        newSchedule = {
            first_name: document.getElementById('create-first').value,
            last_name: document.getElementById('create-last').value,
            sunday: document.getElementById('sun-start').value + " - " + document.getElementById('sun-stop').value,
            monday: document.getElementById('mon-start').value + " - " + document.getElementById('mon-stop').value,
            tuesday: document.getElementById('tues-start').value + " - " + document.getElementById('tues-stop').value,
            wednesday: document.getElementById('wed-start').value + " - " + document.getElementById('wed-stop').value,
            thursday: document.getElementById('thur-start').value + " - " + document.getElementById('thur-stop').value,
            friday: document.getElementById('fri-start').value + " - " + document.getElementById('fri-stop').value,
            saturday: document.getElementById('sat-start').value + " - " + document.getElementById('sat-stop').value,
        }
        if (newSchedule.sunday.length <= 3) {
            newSchedule.sunday = '';
        }
        if (newSchedule.monday.length <= 3) {
            newSchedule.monday = '';
        }
        if (newSchedule.tuesday.length <= 3) {
            newSchedule.tuesday = '';
        }
        if (newSchedule.wednesday.length <= 3) {
            newSchedule.wednesday = '';
        }
        if (newSchedule.thursday.length <= 3) {
            newSchedule.thursday = '';
        }
        if (newSchedule.friday.length <= 3) {
            newSchedule.friday = '';
        }
        if (newSchedule.sunday.length <= 3) {
            newSchedule.sunday = '';
        }
        // switch ()
        console.log("Creating schedule")
        fetch('/portal/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSchedule)
        })
            .then((response) => response.json())
            .then((data) => {
                const schedules = data;
                console.log("new schedule created")
                // console.log('Employee Schedules: ', schedules)
                window.location.href = "/portal";
            });
    };
    const updateSchedule = (e) => {
        const trEls = document.querySelectorAll('tr');
        let scheduleChange;
        trEls.forEach((elem, j) => {
            let cellValueArray = [];
            console.log("Iteration #" + j + "_____________________________")
            console.log(elem.children[j].id)
            cellValueArray.push(elem.children[0].id)
            for (let i = 1; i <= elem.children.length; i++) {
                console.log("in for loop")
                let cellValue = elem.children[i - 1].textContent.trim();
                cellValueArray.push(cellValue);
            };
            scheduleChange = {
                id: cellValueArray[0],
                first_name: cellValueArray[1],
                sunday: cellValueArray[2],
                monday: cellValueArray[3],
                tuesday: cellValueArray[4],
                wednesday: cellValueArray[5],
                thursday: cellValueArray[6],
                friday: cellValueArray[7],
                saturday: cellValueArray[8],
            }
            console.log(scheduleChange)
            const fetchId = scheduleChange.id;
            console.log(`${fetchId}`)
            fetch(`/portal/api/schedule/${fetchId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scheduleChange)
            })
                .then((response) => response.json())
                .then((data) => {
                    const schedules = data;
                    console.log(`Successfully added employe #${fetchId}`)
                    location.href = "/portal";
                });
        })
    }
    const deleteSchedule = (e) => {
        e.stopPropagation();
        const { id } = e.target.dataset;

        fetch(`/portal/api/schedule/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(getSchedules);
    };

    addBtn.addEventListener("click", () => {
        createSchedule();
        modal2.style.display = "none";
        outerModal.style.display = "none"
    });

    editBtn.addEventListener("click", () => {
        console.log("clicked edit");
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

    saveBtn.addEventListener("click", (e) => {
        console.log("clicked save");
        updateSchedule(e);
    });

    deleteBtn.addEventListener("click", () => {
        console.log("clicked delete");
        deleteSchedule();
    });
});