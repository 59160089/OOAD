//inside read_test.js
const assert = require('assert');
const Teacher = require('../models/modelTeacher');
const Course = require('../models/modelCourse')
let teacher;

describe('Reading teacher details', () => {
    beforeEach((done) => {
         teacher = new Teacher ({
            username :  'teacherFirst' ,
            password : 'password' ,
            uType : 'teacher' ,
            prefixName : 'นาย' ,
            firstName : "เดชภัทร" ,
            lastName : 'สร้อยทอง' ,
            faculty : 'IF' ,
            major : 'CS' ,
            course : [new Course()],
            position : "Test"
        })
        teacher.save()
          .then(() => done());
    });
    it('finds teacher with the name of teacher', (done) => {
        Teacher.findOne({ username: 'teacherFirst' })
            .then((teacher) => {
                assert(teacher.username === 'teacherFirst'); 
                done();
            });
    })
})