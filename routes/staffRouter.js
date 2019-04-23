const express = require('express');
const router = express.Router();
const Staff = require('../models/modelStaff')
const bcrypt = require('bcrypt')


router.route('/').get(function (req, res) {
    Staff.find({ uType: "staff" }, function (err, person) {
        if (err) {
            console.log(err)
        } else {
            res.render('staffManage', { person: person })
        }
    })
})

router.route('/create').post(function (req, res) {
    const staff = new Staff(req.body)
    bcrypt.hash(req.body.password , 4 , (err ,hash) => {
        staff.password = hash
        staff.save().then(staff => {
            res.redirect('/manageStaff')
        }).catch(err => {
            console.log(err)
            res.status(400).send("unable to save to database")
        })    
    })
})


router.post('/editStaff', (req, res, next) => {
    bcrypt.hash(req.body.editpassword , 4 , (err , hash) => {
        if(req.body.editpassword.length == 60){
            Staff.findByIdAndUpdate(req.body._id, {
                username: req.body.editusername,
                password: req.body.editpassword,
                prefixName: req.body.editprefixName,
                firstName: req.body.editfirstName,
                lastName: req.body.editlastName,
                faculty: req.body.editfaculty,
                major: req.body.editmajor,
                position: req.body.editposition,
        
            }, (err, data) => {
                console.log(req.body._id)
                console.log(req.body)
                if (err) {
                    return res.status(500).send(err.message)
                }
                res.redirect('/manageStaff')
            })
        }else {
            Staff.findByIdAndUpdate(req.body._id, {
                username: req.body.editusername,
                password: hash,
                prefixName: req.body.editprefixName,
                firstName: req.body.editfirstName,
                lastName: req.body.editlastName,
                faculty: req.body.editfaculty,
                major: req.body.editmajor,
                position: req.body.editposition,
        
            }, (err, data) => {
                console.log(req.body._id)
                console.log(req.body)
                if (err) {
                    return res.status(500).send(err.message)
                }
                res.redirect('/manageStaff')
            })
        }
    })
})


router.route('/delete/:id').get(function (req, res) {
    Staff.findByIdAndRemove({ _id: req.params.id },
        function (err, person) {
            if (!person) res.json(person)
            else res.redirect('/manageStaff')
        })
})


module.exports = router