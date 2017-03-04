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

/************************************
  * VARIABLES
  ***********************************/

 var express       = require("express"),
     request       = require("request"),
     bodyParser    = require("body-parser"),
     mongoose      = require('mongoose'),
     PORT          = process.env.PORT || 3000,
     IP            = process.env.IP,
     app           = express();





/**
 * VIEW ENGINE, DIRECTORIES
 */

/** Static Directory **/
 app.use(bodyParser.urlencoded({extended: true}), express.static("public"));

/** View Engine **/
 app.set("view engine", "ejs");






/************************************
  * DATABASE
  ***********************************/

/**
 * Database Connection
 */
mongoose.connect(process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 'mongodb://localhost/birdsville');

/**
 * Database Scheme
 */
var birdSchema = new mongoose.Schema({
  englishName: String,
  scientificName: String,
  prevImage: String,
  audio: String,
  description: String
});

/**
 * Database Model
 */
var Bird = mongoose.model("Bird", birdSchema);

 /************************************
  * ROUTES
  ************************************/

  /**
   * GET ROUTES
   */

   /** Home **/
   app.get("/", function(req, res) {
     res.render("home");
   });

   // Index Route - Show a list of birds
   app.get("/birds", function(req, res) {
    Bird.find({}, function(err, allBirds) {
      checkForErr(err, allBirds, "GET")(res, "birds", {birds: allBirds});
    });
   });
  
   // New Route - Display a form to create a new bird
   app.get("/birds/new", function (req, res) {
     res.render("new");
   });

   // Create Route - Add new bird to the DB
   app.post("/birds", function (req, res) {
     var englishName = req.body.englishName,
         scientificName = req.body.scientificName,
         prevImage = req.body.prevImage,
         audio = req.body.audio,
         description = req.body.description,
         newBird = {englishName: englishName, scientificName: scientificName, prevImage: prevImage, audio:audio, description:description};
         Bird.create(newBird, function(err, data) {
          checkForErr(err, data, "POST")(res, "/birds");
         });
   });

   // Show Route -  Shows info about one bird
   app.get("/dogs/:id", function(req, res) {
    res.render("");
   });

 /************************************
  * Helper Functions
  ************************************/
function checkForErr(err, data, type) {
    if(type === "dbData") {
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
    } else if (type === "GET"){
        if (err) {
          console.log("******************************");
          console.log("         ERROR");
          console.log("******************************");
          console.log(err);
        } else {
          return function(res, template, obj) {
            return res.render(template, obj);
          }
        }
      } else if (type === "POST") {
          if (err) {
            console.log("******************************");
            console.log("         ERROR");
            console.log("******************************");
            console.log(err);
          } else {
              return function(res, templateUrl) {
                return res.redirect(templateUrl);
              }
          }
      }
}

 /************************************
  * LISTENING PORT SETUP
  ************************************/
 app.listen(PORT, IP, function() {
  console.log("listening on port " + PORT);
});
