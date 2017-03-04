/**
     QQQQQQQQQ              CCCCCCCCCCCCC        CCCCCCCCCCCCC     OOOOOOOOO     DDDDDDDDDDDDD        EEEEEEEEEEEEEEEEEEEEEE
   QQ:::::::::QQ         CCC::::::::::::C     CCC::::::::::::C   OO:::::::::OO   D::::::::::::DDD     E::::::::::::::::::::E
 QQ:::::::::::::QQ     CC:::::::::::::::C   CC:::::::::::::::C OO:::::::::::::OO D:::::::::::::::DD   E::::::::::::::::::::E
Q:::::::QQQ:::::::Q   C:::::CCCCCCCC::::C  C:::::CCCCCCCC::::CO:::::::OOO:::::::ODDD:::::DDDDD:::::D  EE::::::EEEEEEEEE::::E
Q::::::O   Q::::::Q  C:::::C       CCCCCC C:::::C       CCCCCCO::::::O   O::::::O  D:::::D    D:::::D   E:::::E       EEEEEE
Q:::::O     Q:::::Q C:::::C              C:::::C              O:::::O     O:::::O  D:::::D     D:::::D  E:::::E
Q:::::O     Q:::::Q C:::::C              C:::::C              O:::::O     O:::::O  D:::::D     D:::::D  E::::::EEEEEEEEEE
Q:::::O     Q:::::Q C:::::C              C:::::C              O:::::O     O:::::O  D:::::D     D:::::D  E:::::::::::::::E
Q:::::O     Q:::::Q C:::::C              C:::::C              O:::::O     O:::::O  D:::::D     D:::::D  E:::::::::::::::E
Q:::::O     Q:::::Q C:::::C              C:::::C              O:::::O     O:::::O  D:::::D     D:::::D  E::::::EEEEEEEEEE
Q:::::O  QQQQ:::::Q C:::::C              C:::::C              O:::::O     O:::::O  D:::::D     D:::::D  E:::::E
Q::::::O Q::::::::Q  C:::::C       CCCCCC C:::::C       CCCCCCO::::::O   O::::::O  D:::::D    D:::::D   E:::::E       EEEEEE
Q:::::::QQ::::::::Q   C:::::CCCCCCCC::::C  C:::::CCCCCCCC::::CO:::::::OOO:::::::ODDD:::::DDDDD:::::D  EE::::::EEEEEEEE:::::E
 QQ::::::::::::::Q     CC:::::::::::::::C   CC:::::::::::::::C OO:::::::::::::OO D:::::::::::::::DD   E::::::::::::::::::::E
   QQ:::::::::::Q        CCC::::::::::::C     CCC::::::::::::C   OO:::::::::OO   D::::::::::::DDD     E::::::::::::::::::::E
     QQQQQQQQ::::QQ         CCCCCCCCCCCCC        CCCCCCCCCCCCC     OOOOOOOOO     DDDDDDDDDDDDD        EEEEEEEEEEEEEEEEEEEEEE
             Q:::::Q
              QQQQQQ
**/


/***********************
 * Variables
 ***********************/
var mongoose = require('mongoose');

/***********************
 * Database Connection
 ***********************/
mongoose.connect('mongodb://localhost/bird_app');

/***********************
 * Database Schema
 ***********************/
var birdSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String,
    color: String

});

/** Database Model */
var Bird = mongoose.model("Bird", birdSchema);

/** Database Data Creation */

/*var timBk = Bird({
    name: "TimbukTu",
    age: 53,
    temperament: "happy",
    color: "black",
});*/

Bird.create({
    name: 'Snow',
    age: 15, 
    temperament: "bland",
    color: "white"
}, function(err, data) {
    checkForErr(err, data);
});

/** Database Data Save */
/*timBk.save(function (err, data) {
    checkForErr(err, data);
});

/** Retrieve all Birds */
Bird.find({}, function(err, data) {
    checkForErr(err, data);
});

/**
 * Helpers
 */

function checkForErr(err, data) {
    if (err) {
        console.log("******************************");
        console.log("         ERROR");
        console.log("******************************");
        console.log(err);
    } else {
        console.log("******************************");
        console.log("         DATA");
        console.log("******************************");
        console.log(data);
    }
};
