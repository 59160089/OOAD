var express = require('express');
var router = express.Router();
const Course = require('../models/modelCourse')
const Year = require('../models/modelYear')
const Teacher = require('../models/modelTeacher')
const Student = require('../models/modelStudent')
const Subject = require('../models/modelSubject')
const Exam = require('../models/modelExam')
const Room = require('../models/modelRoom')

router.route('/:_id').get(function (req, res) {
    //_id = subjectId
    Subject.findById(req.params._id, (err, sub) => {
        Course.find({ sub_id: req.params._id }, function (err, course) {
            if (err) {
                console.log(err)
            } else {
                // console.log(course)
                Year.findOne({}, (err, year) => {
                    res.render('courseManage', { course: course, year: year, sub_id: req.params._id, subject: sub })
                })
            }
        }).populate('sub_id')
    })
})

router.get('/allJson', (req, res) => {
    Course.find({}, (err, data) => {
        res.send(data)
        console.log(data)
    })
})

//จัดการอาจารย์
router.get('/teacherManage/:courseId', (req, res) => {
    /* console.log('Page : Manage Teacher')
     console.log(`courseId : ${req.params.courseId}`)
     console.log('---------------------')*/
    Teacher.find({ uType: 'teacher' }, (err, person) => {
        Course.findById(req.params.courseId, (err, course) => {
            //console.log(course)
            res.render('courseTeacherManage', { person: person, course: course })
        }).populate(['teacher', 'sub_id'])
    })
})

//เพิ่มอาจารย์เข้าคอร์ส
router.get('/teacherManage/addTeacher/:idTeacher/:courseId', (req, res) => {
    //  console.log(`TeacherId : ${req.params.idTeacher}`)
    // console.log(`courseId : ${req.params.courseId}`)
    // console.log('---------------------')
    Course.findById(req.params.courseId, (err, course) => {
        var arrTeacher = course.teacher
        arrTeacher.push(req.params.idTeacher)
        course.teacher = arrTeacher
        course.save()
        Teacher.findById(req.params.idTeacher, (err, teacher) => {
            // console.log(`Teacher : ${teacher}`)
            var arrCourse = teacher.course
            arrCourse.push(req.params.courseId)
            // console.log(arrCourse)
            teacher.course = arrCourse
            teacher.save()
            res.redirect(`/manageCourse/teacherManage/${req.params.courseId}`)
        })

    })


})

//ลบอาจารย์จากคอร์ส
router.get('/teacherManage/deleteTeacher/:idTeacher/:courseId', (req, res) => {
    //  console.log(`TeacherId : ${req.params.idTeacher}`)
    //  console.log(`courseId : ${req.params.courseId}`)
    //  console.log('---------------------')
    Course.findById(req.params.courseId, (err, course) => {
        var arrTeacher = course.teacher
        console.log(arrTeacher)
        for (var i = 0; i < arrTeacher.length; i++) {
            if (arrTeacher[i]._id == req.params.idTeacher) {
                //เริ่มลบตั้งแต่ตำแหน่ง i ไป 1 ตำแหน่ง (นับตั้งแหน่งที่ i เป็นตำแหน่งที่ 1 เลย) 
                arrTeacher.splice(i, 1)
                break
            }
        }
        course.teacher = arrTeacher
        course.save()

        Teacher.findById(req.params.idTeacher, (err, teacher) => {
            //console.log(teacher.course)
            //console.log(req.params.courseId)
            var arrCourse = teacher.course
            for (var i = 0; i < arrCourse.length; i++) {
                if (arrCourse[i] == req.params.courseId) {
                    //เริ่มลบตั้งแต่ตำแหน่ง i ไป 1 ตำแหน่ง (นับตั้งแหน่งที่ i เป็นตำแหน่งที่ 1 เลย) 
                    arrCourse.splice(i, 1)
                    break
                }
            }
            teacher.course = arrCourse
            teacher.save()
            res.redirect(`/manageCourse/teacherManage/${req.params.courseId}`)
        })
    }).populate('teacher')
})

//จัดการนิสิต
router.get('/studentManage/:courseId', (req, res) => {
    Student.find({ uType: 'student' }, (err, stu) => {
        Course.findById(req.params.courseId, (err, course) => {
            //console.log(course)
            res.render('courseStudentManage', { person: stu, course: course })
        }).populate(['sub_id', 'student'])
    })
})
//เพิ่มนิสิตเข้าคอร์ส
router.get('/studentManage/addStudent/:idStudent/:courseId', (req, res) => {
    console.log(`studentId : ${req.params.idStudent}`)
    console.log(`courseId : ${req.params.courseId}`)
    console.log('---------------------')
    Course.findById(req.params.courseId, (err, course) => {
        var arrStu = course.student
        arrStu.push(req.params.idStudent)
        course.student = arrStu
        course.save()
        Student.findById(req.params.idStudent, (err, stu) => {
            var arrCourse = stu.course
            arrCourse.push(req.params.courseId)
            stu.Course = arrCourse
            stu.save()
            res.redirect(`/manageCourse/studentManage/${req.params.courseId}`)
        })
    })
})

//ลบนิสิตจากคอร์ส
router.get('/studentManage/deleteStudent/:idStudent/:courseId', (req, res) => {
    /*  console.log(`studentId : ${req.params.idStudent}`)
      console.log(`courseId : ${req.params.courseId}`)
      console.log('---------------------')*/
    Course.findById(req.params.courseId, (err, course) => {

        var arrStu = course.student


        for (var i = 0; i < arrStu.length; i++) {
            if (arrStu[i] == req.params.idStudent) {
                arrStu.splice(i, 1)
                break
            }
        }

        course.student = arrStu
        course.save()

        Student.findById(req.params.idStudent, (err, stu) => {
            var arrCourse = stu.course

            for (var i = 0; i < arrCourse.length; i++) {
                if (arrCourse[i] == req.params.courseId) {
                    arrCourse.splice(i, 1)
                    break
                }
            }
            stu.course = arrCourse
            stu.save()
            res.redirect(`/manageCourse/studentManage/${req.params.courseId}`)
        })
    })
})


router.route('/addCourse').post(function (req, res) {

    console.log(req.body)

    Year.find({}, (err, year) => {
        var course = new Course({
            sub_id: req.body.sub_id,
            year: year.year,
            semester: year.semester,
            section: req.body.section,
            exam: [],
            student: [],
            teacher: []
        })

        course.save().then(param1 => {
            res.redirect(`/manageCourse/${req.body.sub_id}`)
        })

    })

})

router.route('/post').post(function (req, res) {
    const course = new Course(req.body)
    course.save().then(course => {
        res.redirect('/manageCourse')
    }).catch(err => {
        res.status(400).send("unable to save to database")
    })
})

//จัดการห้องสอบ
router.route('/manageTestRoom/:examId').get(function (req, res) {
    Room.find({}, (err, room) => {
        Exam.findById(req.params.examId, (err, exam) => {
            res.render('manageTestRoom', { exam: exam, room: room })
        }).populate('room')
    }).populate('building')
})

//ลบการสอบ
router.route('/deleteExam/:examId/:courseId').get(function (req, res) {
    Exam.findById(req.params.examId, (err, exam) => {
        Course.findById(req.params.courseId, (err, course) => {
            var arrExam = course.exam
            for (let i = 0; i < arrExam.length; i++) {
                if (arrExam[i] == req.params.examId) {
                    arrExam.splice(i, 1)
                }
            }
            course.exam = arrExam
            course.save()
            exam.remove()
            res.redirect(`/manageCourse/courseInfo/${req.params.courseId}`)
        })
        /* exam.remove()
         res.redirect(`/manageCourse/courseInfo/${req.params.courseId}`)*/
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

router.route('/delete/:id/:sub_id').get(function (req, res) {
    console.log(req.params.id)
    console.log(req.params.sub_id)
    Course.findById(req.params.id, (err, course) => {
        course.remove()
        res.redirect(`/manageCourse/${req.params.sub_id}`)
    })
})

//รายละเอียดคอร์สเรียน
router.get('/courseInfo/:courseId', (req, res) => {
    Course.findById(req.params.courseId, (err, course) => {
        Year.findOne({}, (err, year) => {
            res.render('Courseinfo', { course: course, year: year })
        })
    }).populate(['sub_id', 'teacher', 'student', 'exam'])
})

//เพิ่มการสอบ
router.post('/courseInfo/addExam/:courseId', (req, res) => {
    var exam = new Exam(req.body)
    console.log(req.body)
    Course.findById(req.params.courseId, (err, course) => {
        for (let i = 0; i < course.student.length; i++) {
            exam.score.push({ studentId: course.student[i]._id, point: '0', seatStatus: 'null' })
        }
        exam.save()
        var arrExam = course.exam
        arrExam.push(exam)
        course.exam = arrExam
        course.save()
        res.redirect(`/manageCourse/courseInfo/${req.params.courseId}`)
    })

})

//เพิ่มห้องสอบ
router.get('/manageTestRoom/addTestRoom/:roomId/:examId', (req, res) => {

    require('../models/modelRoom').findById(req.params.roomId, (err, room) => {
        Exam.findById(req.params.examId, (err, exam) => {

            exam.room.push(room)
            exam.save().then(result => {
                res.redirect(`/manageCourse/manageTestRoom/${req.params.examId}`)
            })
        })
    })
})
//ลบห้องสอบ
router.get('/manageTestRoom/deleteTestRoom/:roomId/:examId', (req, res) => {

    Exam.findById(req.params.examId, (err, exam) => {
        for (let i = 0; i < exam.room.length; i++) {
            if (exam.room[i]._id == req.params.roomId) {
                exam.room.splice(i, 1)
                break
            }
        }
        exam.save().then((result => {
            res.redirect('/manageCourse/manageTestRoom/' + req.params.examId)
        }))
    })
})

//
router.get('/autoFillSeat/:examId/:roomId', (req, res) => {
    let indexSeat = 0
    Room.findById(req.params.roomId, (err, room) => {
        require('../models/modelExam').findById(req.params.examId, (err, exam) => {

            /*  //loop ที่นั่งที่ว่างในห้อง
              for(let i = 0 ;  i < room.seat.length ; i++){
                  if(room.seat[i].student == null) {
                      // loop นิสิตที่ยังไม่มีที่นั่ง 
                      console.log('seat empty')
                      for(let j = 0 ; j < exam.score.length ; j++){
                          if(exam.score[j].seatStatus == "null"){
                              console.log('student seat null')
                              room.seat[i].student = exam.score[j].student
                              exam.score[j].seatStatus == room.seat[i].no
                              break
                          }
                      }
                      break
                  }
              }*/

            //loop หานิสิตที่ยังไม่มีที่นั่ง
            for (let i = 0; i < exam.score.length; i++) {
                if (exam.score[i].seatStatus == 'null') {
                    //ยังไม่มีที่นั่ง
                    for (let j = indexSeat; j < room.seat.length; j++) {
                        if (room.seat[j].student == null) {
                            //ที่นั่งว่าง
                            exam.score[i].seatStatus = room.seat[j].no
                            room.seat[j].student = exam.score[i].studentId
                            indexSeat = j++
                            break
                        }
                    }
                }
            }

            room.save()
            exam.save()
            res.redirect(`/manageBuilding/inRoom/${req.params.roomId}/${req.params.examId}`)
        })

    })

})






module.exports = router;