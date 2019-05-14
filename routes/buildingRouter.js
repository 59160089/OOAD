var express = require('express');
var router = express.Router();
const Building = require('../models/modelBuilding')
const Room = require('../models/modelRoom')



router.route('/').get(function (req, res) {
    Building.find(function (err, building) {
        if (err) {
            console.log(err)
        } else {
            res.render('buildingManage', { building, building })
        }
    })
})




router.route('/create').post(function (req, res) {
    const building = new Building(req.body)
    building.save().then(building => {
        res.redirect('/manageBuilding')
    }).catch(err => {
        console.log(err)
        res.status(400).send("unable to save to database")
    })

})


router.post('/updateBuilding', (req, res, next) => {
    Building.findByIdAndUpdate(req.body._id, {
        buildingName: req.body.editbuildingName,
        floor: req.body.editfloor
    }, (err, data) => {
        console.log(req.body._id)
        console.log(req.body)
        if (err) {
            return res.status(500).send(err.message)
        }
        res.redirect('/manageBuilding')
    })
})



router.route('/delete/:id').get(function (req, res) {
    Building.findByIdAndRemove({ _id: req.params.id },
        function (err, building) {
            if (!building) res.json(building)
            else res.redirect('/manageBuilding')
        })
})

//ของตูน-----------------------------------------

router.route('/room/:id').get(function (req, res) {
    const id = req.params.id;
    Building.findById(id, function (err, building) {
        if (err) {
            console.log(err)
        } else {
            res.render('roomManage', { building, building })
        }
    }).populate('room')
})



router.route('/addRoom/:id').post(function (req, res) {
    var obj = new Room({
        name: req.body.roomName,
        floor: req.body.floor,
        col: req.body.column,
        row: req.body.row
    })

    var seatArr = obj.seat

    var az = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    for (let i = 0; i < obj.row; i++) {
        for (let j = 0; j < obj.col; j++) {
            seatArr.push('se')
           
        }
    }
    obj.seat = seatArr
    console.log(seatArr)

    console.log(obj.seat)

    obj.save().then(room => {
        Building.findById(req.params.id, function (err, building) {

            if (err)
                console.log(err)
            obj.save().then(room => {

                // console.log(room)
                let roomArr = building.room

                roomArr.push(room)

                building.room = roomArr

                building.save().then(buildings => {
                   // console.log(buildings)
                })
            })
            res.redirect(`/manageBuilding/room/${req.params.id}`)

        })

    })


})
//ของตูน---------------------------------------------------

router.route('/deleteRoom/:roomId/:buildingId').get(function (req, res) {
    const buildingId = req.params.buildingId
    const roomId = req.params.roomId

    Room.findById(roomId, (err, room) => {
        room.remove().then(result => {
            res.redirect(`/manageBuilding/room/${req.params.buildingId}`)
        })
    })




})
router.route('/update/:id').post(function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (!course)
            return next(new Error('Could not load Document'))
        else {
            // do your updates here
            course.course_id = req.body.course_id
            course.course_name = req.body.course_name
            course.section = req.body.section
            course.year = req.body.year
            course.save().then(course => {
                res.redirect('/manage/course')
            })
                .catch(err => {
                    res.status(400).send("unable to update the database")
                })
        }
    })
})

//จบของตูน---------------------------------------------------



module.exports = router;