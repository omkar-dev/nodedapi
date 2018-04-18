const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const sql = require('mssql')


  var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ZTg2OTA3N2ItMzdhNy00OGM2LWIzZWMtOTQyNzdhZDMzYzdm"
    };
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    
    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
  };
  










//http://localhost:5000/notification?messege=hellow
var app = express();  
var server = require('http').createServer(app);  
app.use(express.static(__dirname + '/node_modules'));  
app.get('/notification', (req, res) =>
{
  var mssg= req.param('messege');
  //res.send(messege);
  var message = { 
    app_id: "abd823f7-38ae-45ef-b340-b47dea4062a7",
    contents: {"en": mssg},
    included_segments: ["All"]
  };
  
  var ress =sendNotification(message);
  if(ress==Error){
   res.send('Error');

  }
  else if(ress==null) 
  {  

    res.send('ok');

   }

   else{

    res.send(ress);

   }
}

)





app.get('/menu', (req, res) =>
{
  
   var sql = require("mssql");

   // config for your database
   var config = {
       user: 'nfopapp',
       password: '2$t@TeS1',
       server: '52.34.218.113',
       database:'VUE_IUECWEB'
   };

   // connect to your database
   sql.connect(config, function (err) {
   
       if (err) console.log(err);

       // create Request object
       var request = new sql.Request();
          
       // query to the database and get the records
   /* request.query('select * from ', function (err, recordset) {
           
           if (err) console.log(err)

           // send records as a response
           res.send(recordset);
           
       });*/


       request.execute('[GetMenuMasterList]', function(err, recordsets, returnValue) {
        // ... error checks
/*
        console.log(recordsets.length); // count of recordsets returned by the procedure
        console.log(recordsets[0].length); // count of rows contained in first recordset
        console.log(returnValue); // procedure return value
        console.log(recordsets.returnValue); // same as previous line
        console.log(affected); // number of rows affected by the statemens
        console.log(recordsets.rowsAffected); // same as previous line


*/

var menu = {}
if (err) console.log(err);
console.log(recordsets.recordset)

res.send(recordsets.recordset);
sql.close()
//return();
/*
for (var key in recordsets.recordset) {
  if (key.IsHeader==true&&) {


    IsChild: false,
    IsSub: false

 
    
  }
}
   */


          
                     // send records as a response
                     //res.send(recordset);
      
    });



   });


  //ßß sql.close();
});







app.get('/header', (req, res) =>
{
  
   var sql = require("mssql");

   // config for your database
   var config = {
       user: 'nfopapp',
       password: '2$t@TeS1',
       server: '52.34.218.113',
       database:'VUE_IUECWEB'
   };

   // connect to your database
   sql.connect(config, function (err) {
   
       if (err) console.log(err);

       // create Request object
       var request = new sql.Request();
          
       // query to the database and get the records
   /* request.query('select * from ', function (err, recordset) {
           
           if (err) console.log(err)

           // send records as a response
           res.send(recordset);
           
       });*/


       request.execute('[GetStaicPageApp]', function(err, recordsets, returnValue) {
        // ... error checks
/*
        console.log(recordsets.length); // count of recordsets returned by the procedure
        console.log(recordsets[0].length); // count of rows contained in first recordset
        console.log(returnValue); // procedure return value
        console.log(recordsets.returnValue); // same as previous line
        console.log(affected); // number of rows affected by the statemens
        console.log(recordsets.rowsAffected); // same as previous line


*/

var menu = {}
if (err) console.log(err);
console.log(recordsets.recordset)

res.send(recordsets.recordset);

sql.close()
//return();
/*
for (var key in recordsets.recordset) {
  if (key.IsHeader==true&&) {


    IsChild: false,
    IsSub: false

 
    
  }
}
   */


          
                     // send records as a response
                     //res.send(recordset);
      
    });



   });


  //ßß sql.close();
});







server.listen(PORT, () => console.log(`Listening on ${ PORT }`))


//http://example.com/api/users?id=4&token=sdfa3&geo=us