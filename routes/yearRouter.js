var express = require('express');
var router = express.Router();
const Year = require('../models/modelYear')



router.route('/').get(function(req, res){
    Year.find({}, function (err , year) {
        if(err) {
            console.log(err)
        }else {
            //console.log(year)
            res.render('yearManage' , {year , year})
        }
    })
})

/*
router.route('/addYear').get(function (req, res) {
    res.render('addYear')
})*/

/*
router.route('/post').post(function (req, res) {
    const year = new Year(req.body)
    year.save().then(course => { 
        res.redirect('/manageYear') 
    }).catch(err => { 
        res.status(400).send("unable to save to database") 
    })
})*/


/*
router.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Year.findById(id, function (err, year) {
        res.render('editYear', { year: year })
    })
})*/

router.route('/update').post(function (req, res) {

    console.log(req.body)

    Year.findById("5cae048afb6fc01d56646220", function (err, year) {
        if (!year)
            return next(new Error('Could not load Document'))
        else {
            console.log(year)
            // do your updates here
            year.year = req.body.year
            year.semester = req.body.semester
            year.save().then(year => {
                res.redirect('/manageYear')
            })
                .catch(err => {
                    res.status(400).send("unable to update the database")
                })
        }
    })

    
})
/*
router.route('/delete/:id').get(function (req, res) {
    Year.findByIdAndRemove({ _id: req.params.id },
        function (err, year) {
            if (!year) res.json(year)
            else res.redirect('/manageYear')
        })
})
*/





module.exports = router ;