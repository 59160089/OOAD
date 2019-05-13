// update_test.js
const assert = require('assert');
const Teacher = require('../models/modelTeacher');
const Course = require('../models/modelCourse')
describe('Deleting a teacher', () => {

  let teacher;

  beforeEach((done) => {
    teacher = new Teacher({
      username: 'teacherFirst',
      password: 'password',
      uType: 'teacher',
      prefixName: 'นาย',
      firstName: "เดชภัทร",
      lastName: 'สร้อยทอง',
      faculty: 'IF',
      major: 'CS',
      course: [new Course()],
      position: "Test"
    })
    teacher.save()
      .then(() => done());
  });

  function assertHelper(statement, done) {
    statement
      .then(() => Teacher.find({}))
      .then((teacher) => {
        assert(teacher.length === 1);
        assert(teacher[0].username === 'teacherFirst');
        done();
      });
  }

  it('sets and saves teacher using an instance', (done) => {
    teacher.set('password', 'pordwass'); //not updated in mongodb yet
    assertHelper(teacher.save(), done);
  });

  it('update teacher using instance', (done) => {
    //useful to update multiple fields of the object
    assertHelper(teacher.update({ password: 'pordwass' }), done);
  });

  it('update all matching teacher using model', (done) => {
    assertHelper(Teacher.update({ password: 'password' }, { password: 'pordwass' }), done);
  });

  it('update one teacher using model', (done) => {
    assertHelper(Teacher.findOneAndUpdate({ username: 'teacherFirst' }, { password: 'pordwass' }), done);
  });

  it('update one teacher with id using model', (done) => {
    assertHelper(Teacher.findByIdAndUpdate(teacher._id, { password: 'pordwass' }), done);
  });
});