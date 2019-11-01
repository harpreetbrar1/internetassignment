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