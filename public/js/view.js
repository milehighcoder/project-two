document.addEventListener('DOMContentLoaded', (e) => {
    const viewBtn = document.getElementById('view-team-button');

    const getSchedules = () => {
        console.log("getting schedules")
        fetch('/portal/api/schedule', {
            method: 'GET',
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

    viewBtn.addEventListener("click", () => {
        console.log("clicked");
        getSchedules();
    });



});