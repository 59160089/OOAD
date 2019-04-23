const express = require('express');
const router = express.Router();
const Student = require('../models/modelStudent')
const bcrypt = require('bcrypt')


router.route('/').get(function(req, res) {
    Student.find({ uType: "student" }, function(err, person) {
        if (err) {
            console.log(err)
        } else {
            res.render('studentManage', { person: person })
        }
    })
})

router.route('/create').post(function(req, res) {
    const stud = new Student(req.body)

    bcrypt.hash(req.body.password , 4 , (err , hash) => {
        stud.password = hash
        stud.save().then(stud => {
            res.redirect('/manageStudent')
        }).catch(err => {
            console.log(err)
            res.status(400).send("unable to save to database")
        })
    })
    

})


router.post('/editStud', (req, res, next) => {

    bcrypt.hash(req.body.editpassword , 4 , (err , hash) => {
        if(req.body.editpassword.length == 60){
            Student.findByIdAndUpdate(req.body._id, {
                username: req.body.editusername,
                password: req.body.editpassword,
                prefixName: req.body.editprefixName,
                firstName: req.body.editfirstName,
                lastName: req.body.editlastName,
                faculty: req.body.editfaculty,
                major: req.body.editmajor,
                year: req.body.edityear,
                branch: req.body.editbranch,
                sector: req.body.editsector,
                uType: req.body.edituType
            }, (err, data) => {
                console.log(req.body._id)
                console.log(req.body)
                if (err) {
                    return res.status(500).send(err.message)
                }
                res.redirect('/manageStudent')
            })
        }else {
            Student.findByIdAndUpdate(req.body._id, {
                username: req.body.editusername,
                password: hash,
                prefixName: req.body.editprefixName,
                firstName: req.body.editfirstName,
                lastName: req.body.editlastName,
                faculty: req.body.editfaculty,
                major: req.body.editmajor,
                year: req.body.edityear,
                branch: req.body.editbranch,
                sector: req.body.editsector,
                uType: req.body.edituType
            }, (err, data) => {
                console.log(req.body._id)
                console.log(req.body)
                if (err) {
                    return res.status(500).send(err.message)
                }
                res.redirect('/manageStudent')
            })
        }
    })
 
})


// router.route('/update/:id').post(function(req, res) {
//     Student.findById(req.params.id, function(err, person) {
//         if (!person)
//             return next(new Error('Could not load Document'))
//         else {
//             // do your updates here
//             person.username = req.body.username
//             person.password = req.body.password
//             person.prefixName = req.body.prefixName
//             person.ID = req.body.ID
//             person.firstName = req.body.firstName
//             person.lastName = req.body.lastName
//             person.faculty = req.body.faculty
//             person.major = req.body.major
//             person.year = req.body.year
//             person.branch = req.body.branch
//             person.sector = req.body.sector

//             bcrypt.hash(req.body.password, 4, (err, hash) => {
//                 if (!((req.body.password).length == 60)) {
//                     console.log('is password')
//                     person.password = hash
//                 }
//                 person.save().then(person => {
//                     res.redirect('/manageStudent')
//                 }).catch(err => {
//                     res.status(400).send("unable to update the database")
//                 })
//             })
//         }
//     })
// })


router.route('/delete/:id').get(function(req, res) {
    Student.findByIdAndRemove({ _id: req.params.id },
        function(err, person) {
            if (!person) res.json(person)
            else res.redirect('/manageStudent')
        })
})


module.exports = router