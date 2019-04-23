var express = require('express')
var router = express.Router()
const Teacher = require('../models/modelTeacher')
const bcrypt = require('bcrypt')

router.route('/').get(function (req, res) {
    Teacher.find({ uType: 'teacher' }, function (err, person) {
        if (err) {
            console.log(err)
        } else {
            // eslint-disable-next-line no-dupe-keys
            res.render('teacherManage', { person, person })
        }
    })
})

router.route('/create').post(function (req, res) {
    const teach = new Teacher(req.body)

    bcrypt.hash(req.body.password, 4, (err, hash) => {

        teach.password = hash

        teach.save().then(teach => {
            res.redirect('/manageTeacher')
        }).catch(err => {
            console.log(err)
            res.status(400).send("unable to save to database")
        })

    })



})


router.post('/editTeach', (req, res) => {

    
    bcrypt.hash(req.body.editpassword , 4 , (err , hash) => {
        if(req.body.editpassword.length == 60 ){
            Teacher.findByIdAndUpdate(req.body._id, {
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
                res.redirect('/manageTeacher')
            })
        }else {
            Teacher.findByIdAndUpdate(req.body._id, {
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
                res.redirect('/manageTeacher')
            })
        }
    })


})


router.route('/delete/:id').get(function (req, res) {
    Teacher.findByIdAndRemove({ _id: req.params.id },
        function (_err, person) {
            if (!person) res.json(person)
            else res.redirect('/manageTeacher')
        })
})

router.route('/info/:id').get((req, res) => {
    Teacher.findById(req.params.id, (err, person) => {
        if (err) {
            console.log(err)
        } else {
            res.render('teacherInfo', { person: person })
        }
    })
})

module.exports = router