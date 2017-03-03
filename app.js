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

 var express = require("express"),
     request = require("request"),
     bodyParser = require("body-parser"),
     PORT = process.env.PORT || 3000,
     IP = process.env.IP,
     app = express();


/**
 * VIEW ENGINE, DIRECTORIES
 */

/** Static Directory **/
 app.use(bodyParser.urlencoded({extended: true}), express.static("public"));

/** View Engine **/
 app.set("view engine", "ejs");

 /************************************
  * DATA
  ************************************/
  var campgrounds = [
    {name: "Solopml Creek", image:"https://static.pexels.com/photos/129922/pexels-photo-129922.jpeg"},
    {name: "Granite Hill", image:"https://static.pexels.com/photos/237740/pexels-photo-237740.jpeg"},
    {name: "Mounain Goat's Rest", image:"https://static.pexels.com/photos/230601/pexels-photo-230601.jpeg"},
    {name: "Salmon Creek", image:"https://static.pexels.com/photos/129922/pexels-photo-129922.jpeg"},
    {name: "Granite Hill", image:"https://static.pexels.com/photos/237740/pexels-photo-237740.jpeg"},
    {name: "Mountain Goat's Rest", image:"https://static.pexels.com/photos/230601/pexels-photo-230601.jpeg"},
    {name: "Salmon Creek", image:"https://static.pexels.com/photos/129922/pexels-photo-129922.jpeg"},
    {name: "Granite Hill", image:"https://static.pexels.com/photos/237740/pexels-photo-237740.jpeg"},
    {name: "Mountain Goat's Rest", image:"https://static.pexels.com/photos/230601/pexels-photo-230601.jpeg"},
    {name: "Salmon Creek", image:"https://static.pexels.com/photos/129922/pexels-photo-129922.jpeg"},
    {name: "Granite Hill", image:"https://static.pexels.com/photos/237740/pexels-photo-237740.jpeg"},
    {name: "Mountain Goat's Rest", image:"https://static.pexels.com/photos/230601/pexels-photo-230601.jpeg"},
    {name: "Salmon Creek", image:"https://static.pexels.com/photos/129922/pexels-photo-129922.jpeg"},
    {name: "Granite Hill", image:"https://static.pexels.com/photos/237740/pexels-photo-237740.jpeg"},
    {name: "Mountain Goat's Rest", image:"https://static.pexels.com/photos/230601/pexels-photo-230601.jpeg"}
  ]
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

   app.get("/campgrounds", function(req, res) {
     res.render("campgrounds", {campgrounds:campgrounds});
   });

   app.post("/campgrounds", function (req, res) {
     var name = req.body.name,
         image = req.body.image,
         newCampground = {name: name, image: image};
         campgrounds.push(newCampground);
         setTimeout(function() {
           res.redirect("/campgrounds");
         }, 3000)
   });

   app.get("/campgrounds/new", function (req, res) {
     res.render("new");
   });
 /************************************
  * LISTENING PORT SETUP
  ************************************/
 app.listen(PORT, IP, function() {
  console.log("listening on port " + PORT);
});
