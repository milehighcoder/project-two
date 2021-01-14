const db = require('../models');

module.exports = function (app) {
    // GET route for getting all of the employees
    app.get('/api/schedule', (req, res) => {
        console.log(req.body)

        db.Employee.findAll().then((result) => res.json(result));
    });

    app.post('/api/schedule', (req, res) => {
        db.Employee.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
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