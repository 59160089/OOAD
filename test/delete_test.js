//inside read_test.js
const assert = require('assert');
const Teacher = require('../models/modelTeacher');
const Course = require('../models/modelCourse')
let teacher;

describe('Delete teacher details', () => {
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
            course : [new Course()] ,
            position : "Test"
        })
        teacher.save()
          .then(() => done());
    });
    it('removes a teacher using its instance', (done) => {
        Teacher.remove()
        .then(() => Teacher.findOne({ username: 'teacherFirst' }))
        .then((teacher) => {
          assert(teacher === null);
          done();
        });
    });
    it('removes multiple teacher', (done) => {
        Teacher.remove({ username: 'teacherFirst' })
        .then(() => Teacher.findOne({ username: 'teacherFirst' }))
        .then((teacher) => {
          assert(teacher === null);
          done();
        });
    });
  
    it('removes a teacher', (done) => {
        Teacher.findOneAndRemove({ username: 'teacherFirst' })
        .then(() => Teacher.findOne({ username: 'teacherFirst' }))
        .then((teacher) => {
          assert(teacher === null);
          done();
        });
    });
  
    it('removes a pokemon using id', (done) => {
        Teacher.findByIdAndRemove(teacher._id)
      // the following code block is repeated again and again
        .then(() => Teacher.findOne({ username: 'teacherFirst' }))
        .then((teacher) => {
          assert(teacher === null);
          done();
        });
      })
})