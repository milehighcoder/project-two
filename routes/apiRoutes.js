const db = require('../models');

module.exports = function (app) {
    // GET route for getting all of the employees
    app.get('/api/schedule', (req, res) => {
        console.log(req.body)
        // Write code here to retrieve all of the todos from the database and res.json them back to the user
        db.Employee.findAll().then((result) => res.json(result));
    });

    app.post('/api/schedule', (req, res) => {
        db.Employee.create({
            first_name: req.body.first,
            last_name: req.body.last,
            monday: req.body.monday,
            tuesday: req.body.tuesday,
            wednesday: req.body.wednesday,
            thursday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            sunday: req.body.sunday,
        }).then((dbEmployee) => res.json(dbEmployee));
    });

};