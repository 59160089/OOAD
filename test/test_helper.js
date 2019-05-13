//inside tests/test_helper.js
const mongoose = require('mongoose');
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;
const uri = "mongodb+srv://atlas:59160089@dtstcluster-fnhni.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true }); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
//Called hooks which runs before something.
beforeEach((done) => {
    mongoose.connection.collections.person.drop(() => {
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    }); 
});