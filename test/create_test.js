//inside create_test.js
const assert = require('assert');
const Teacher = require('../models/modelTeacher'); //imports the Pokemon model.
const Course = require('../models/modelCourse')
describe('Creating documents', () => {
    it('creates a teacher', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        //const poke = new Pokemon({ name: 'Pickachu' });
        const teacher = new Teacher ({
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
        teacher.save() //takes some time and returns a promise
            .then(() => {
                assert(!teacher.isNew); //if poke is saved to db it is not new
                done();
            });
    });
});