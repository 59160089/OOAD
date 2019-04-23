var express = require('express');
var router = express.Router();
const Subject = require('../models/modelSubject')
const Year = require('../models/modelYear')



router.route('/').get(function (req, res) {

    Subject.find({}, function (err, subject) {
        if (err) {
            console.log(err)
        } else {
            Year.find({}, (err, year) => {
                //console.log(year)
                res.render('subjectManage', { subject: subject, year: year })
            })
        }
    })
})


router.route('/create').post(function (req, res) {

    const subject = new Subject(req.body)
    subject.save().then(subject => {
        res.redirect('/manageSubject')
    }).catch(err => {
        console.log(err)
        res.status(400).send("unable to save to database")
    })

})

router.route('/change/:subId').get(function (req, res) {
    Subject.findById(req.params.subId, (err, subject) => {
        var status = subject.sub_status
        if (status == 'ปิด') {
            subject.sub_status = 'เปิด'
        } else {
            subject.sub_status = 'ปิด'
        }
        subject.save().then( result => {
            res.redirect('/manageSubject')
        })
    })
})

router.post('/updateSubject', (req, res, next) => {
    Subject.findByIdAndUpdate(req.body._id, {
        sub_id: req.body.editsub_id,
        sub_name: req.body.editsub_name,
        sub_status: req.body.editsub_status,
        semester: req.body.editsemester,
        year: req.body.edityear
    }, (err, data) => {
        console.log(req.body._id)
        console.log(req.body)
        if (err) {
            return res.status(500).send(err.message)
        }
        res.redirect('/manageSubject')
    })
})

router.route('/delete/:id').get(function (req, res) {
    Subject.findByIdAndRemove({ _id: req.params.id },
        function (err, subject) {
            if (!subject) res.json(subject)
            else res.redirect('/manageSubject')
        })
})


module.exports = router;