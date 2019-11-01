let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');


var mysql = require('mysql2');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "helloworld",
  database: "peoplebook"
});



//con.connect(function(err) {
//  if (err) throw err;
//  con.query("SELECT * FROM Customers", function (err, result, fields) {
//    if (err) throw err;
//    console.log(result);
//  });
//});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let peopleRoutes = require('./routes/peoples');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req,res) {
    res.render('home', { pageTitle: 'Memory Game', heading: 'Rotation Matrix'});
});


app.get('/html/leaderboard', function (req,res) {
  res.send('Hello World!')
});




app.use(peopleRoutes);

app.listen(3000, () => console.log('Server ready'))



