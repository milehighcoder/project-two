// const apiAuth = require("../middleware/apiAuth");
document.addEventListener('DOMContentLoaded', (e) => {
    // storing locations of elements to traverse the DOM
    const editBtn = document.getElementById('edit-button');
    const saveBtn = document.getElementById('save-button');
    const addBtn = document.getElementById('add-button');
    const deleteBtn = document.getElementById('delete-schedule-button');
    const tdEls = document.querySelectorAll('td');
    const modal2 = document.getElementById('Modal2-content');
    const outerModal = document.getElementById('Modal2')
    const tdArray = Array.from(tdEls);

    // READ Schedules --->  GET
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

    // CREATE New Schedule --->  POST
    const createSchedule = () => {
        // object to store user response from Modal3 (create schedule)
        let newSchedule = {
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
        // conditional that checks if values were entered for shifts
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
        if (newSchedule.saturday.length <= 3) {
            newSchedule.saturday = '';
        }
        // POST request using newSchedule object
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
                window.location.href = "/portal";
            });
    };

    // UPDATE Schedules --->  PUT
    const updateSchedule = (e) => {
        // selects all table rows (each employee schedule)
        const trEls = document.querySelectorAll('tr');
        let scheduleChange;
        // 
        trEls.forEach((elem, j) => {
            // Array to hold the cell data from each row (to use as edited schedule values)
            let cellValueArray = [];
            cellValueArray.push(elem.children[0].id)
            // Iteration through each day in schedule to store text content in array
            for (let i = 1; i <= elem.children.length; i++) {
                let cellValue = elem.children[i - 1].textContent.trim();
                cellValueArray.push(cellValue);
            };
            // Create edited schedule based on values in array
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
            // stores employee id to use in PUT request
            const fetchId = scheduleChange.id;
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
                    window.location.href = "/portal";
                });
        })
    }

    // DELETE Schedules --->  DELETE
    const deleteSchedule = (e) => {
        e.stopPropagation();
        const deleteIcon = document.getElementsByClassName('delete-icon');
        // DELETE function when icon is clicked
        const deleteRow = (e) => {
            // grabs employee id from parent, parent node
            const parentId = e.target.parentNode.parentNode.id
            // confirm the delete
            let confirmDelete = confirm("Are you sure you want to delete this employee schedule?")
            // if confirmed, run the fetch delete call
            if (confirmDelete) {
                fetch(`/portal/api/schedule/${parentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(`Successfully removed employe #${fetchId}`)
                    });
            }
            // refresh window to update schedule
            window.location.href = "/portal";
        };
        // add event listeners to delete icons
        for (let i = 0; i < deleteIcon.length; i++) {
            deleteIcon[i].addEventListener('click', deleteRow);
        }
    }

    // BUTTON Event Handlers
    // Add Button on Modal for 'Create Schedule'
    addBtn.addEventListener("click", () => {
        createSchedule();
        modal2.style.display = "none";
        outerModal.style.display = "none"
    });

    // Edit Button on Dropdown Menu for Schedule
    editBtn.addEventListener("click", () => {
        // assigns editable attribute to each <td>
        tdArray.forEach((elem) => {
            elem.setAttribute("contenteditable", true)
            // conditional to set class based on days on or off
            if (elem.className === "day cell-morning-shift") {
                elem.className = "day calendar-edit-blue"
            } else {
                elem.className = "calendar-edit-gray"
            }
        })
        // shows 'save' button during editing process (until clicked)
        saveBtn.style.display = 'block';
    });

    // Save Button for Edited Schedule (shows during editing)
    saveBtn.addEventListener("click", (e) => {
        console.log("clicked save");
        updateSchedule(e);
    });

    // Delete Button on Dropdown Menu to remove Schedule
    deleteBtn.addEventListener("click", () => {
        console.log("clicked delete");
        deleteSchedule(e);
    });

})