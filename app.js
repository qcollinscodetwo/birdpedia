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
     uri           = "mongodb://heroku_n54wsvdg:mc04d2bhgl8tt2eub6ja6t3or7@ds117830.mlab.com:17830/heroku_n54wsvdg",
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
mongoose.connect( uri || 'mongodb://localhost/birdsville' );

/**
 * Database Scheme
 */
var birdSchema = new mongoose.Schema({
  englishName: String,
  scientificName: String,
  prevImage: String,
  audio: String,
  description: String,
  kingdom: String,
  phylum: String,
  className: String,
  order: String,
  family: String,
  genus: String,
  species: String,
  distribution: {type: String, default: null},
  longDescription: String,
  behaviour: {type: String, default: null},
  breeding: {type: String, default: null},
  ecology: {type: String, default: null},
  taxonomy: {type: String, default: null},
  img01: {type: String, default: null},
  img02: {type: String, default: null},
  img03: {type: String, default: null},
  img04: {type: String, default: null},
  vid01: {type: String, default: null},
  vid02: {type: String, default: null},
  vid03: {type: String, default: null},
  vid04: {type: String, default: null}
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
      checkForErr(err, allBirds, "GET")(res, "index", {birds: allBirds});
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
         kingdom = req.body.kingdom,
         phylum = req.body.phylum,
         className = req.body.className,
         order = req.body.order,
         family = req.body.family,
         genus = req.body.genus,
         species = req.body.species,
         distribution = req.body.distribution,
         longDescription = req.body.longDescription,
         behaviour = req.body.behaviour,
         breeding = req.body.breeding,
         ecology = req.body.ecology,
         taxonomy = req.body.taxonomy,
         img01 = req.body.img01,
         img02 = req.body.img02, 
         img03 = req.body.img03,
         img04 = req.body.img04,
         vid01 = req.body.vid01,
         vid02 = req.body.vid02,
         vid03 = req.body.vid03,
         vid04 = req.body.vid04,
         newBird = {
           englishName: englishName, 
           scientificName: scientificName, 
           prevImage: prevImage, 
           audio:audio, 
           description:description,
           kingdom:kingdom,
           phylum:phylum,
           className:className,
           order:order,
           family:family,
           genus:genus,
           species:species,
           distribution:distribution,
           longDescription:longDescription,
           behaviour:behaviour,
           breeding:breeding,
           ecology:ecology,
           taxonomy:taxonomy,
           img01:img01,
           img02:img02,
           img03:img03,
           img04:img04,
           vid01:vid01,
           vid02:vid02,
           vid03:vid03,
           vid04:vid04
          };
         Bird.create(newBird, function(err, data) {
          checkForErr(err, data, "POST")(res, "/birds");
         });
   });

   // Show Route -  Shows info about one bird
   app.get("/birds/:id", function(req, res) {
     var id = req.params.id;
     Bird.findById(id, function(err, data) {
       checkForErr(err, data, "GET")(res, "show", { bird: data });
     });
   });

   // Wrong Page 
   app.get("*", function(req, res) {
    res.send("There's nothing here.");
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
