var http = require('http');
// var mongodb = require('mongodb');
var mongodb = require('mongodb').MongoClient;
var qs=require('querystring');


var port = 8080;
var mongo_host =  'localhost' ;
var mongo_port =  27017 ;
// var url = 'mongodb://'+mongo_host+':'+mongo_port+'/employee';
// var url = 'mongodb://'+mongo_host+':'+mongo_port+'/mymondb';
//var url = 'mongodb://mongo-0.mongo:27017/mymondb';
var url= 'mongodb://127.0.0.1:27017/mymondb';
var dbName = "mymondb";

var  MongoClient = require('mongodb').MongoClient;

function createHomePage(req,res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<html>");
        res.write("<body style='background-color:lightyellow;'> ");
        res.write("<center>");
        res.write("<form name='DisplayForm' method='POST' >");
        res.write("<legend><center><h1> Demo Microservices application with MONGO/</h1></center></legend>");
    res.write("<input type='button' onclick=\"location.href='/AddEmployee'\" value='AddEmployee' />");
        res.write("<input type='button' onclick=\"location.href='/UpdateEmployee'\" value='UpdateEmployee' />");
        res.write("<input type='button' onclick=\"location.href='/GetEmployee'\" value='GetEmployee' />");
        res.write("<input type='button' onclick=\"location.href='/DeleteEmployee'\" value='DeleteEmployee' />");
    res.write("</form>");
    res.write("</center>");
    res.write("</body>");
        res.write("</html>");
        res.end();

}

function addPayments(req,res,data){
    res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<html>");
        res.write("<body style='background-color:lightyellow;'> ");
    res.write("<center>hello");
    // res.write("</center>");
    // res.write("</body>");
    // res.write("</html>");
    // res.end();

        MongoClient = new mongodb(url);
    MongoClient.connect(function (err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {

            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            const db = client.db(dbName);

            // Get the documents collection
            var collection = db.collection('payments');
            collection.remove(function(err, result) {
                if (err) {
                    console.log(err);
                    res.write("<tr>");
                    res.write("<td> remove error.</td>");
                    res.write("</tr>");
                    res.write("</center>");
                    res.write("</body>");
                    res.write("</html>");
                    res.end();
                    //Close connection
                    MongoClient.close();
                } else {
                    insertPayments(collection, res);
                }
            });
        }
    });
}

function insertPayments(collection, res) {
    //Add employee
    var payments = [
        { aid:1, cate:1, cost:350, date:1567855597000 },
        { aid:2, cate:1, cost:1000, date:1567473597000 },
        { aid:3, cate:0, cost:220, date:1567453597000 },
        { aid:4, cate:0, cost:300, date:1567493597000 }
    ];

    // Insert some users
    collection.insertMany(payments, function (err, result) {
        if (err) {
            console.log(err);
            res.write("<tr>");
            res.write("<td>insert error.</td>");
            res.write("</tr>");
            res.write("</center>");
            res.write("</body>");
            res.write("</html>");
            res.end();
            //Close connection
            MongoClient.close();
        } else {
            console.log('insert success');
            getPayments(collection, res);
        }
    });
}

function getPayments(collection, res) {
    // Insert some users
    collection.find({}).toArray(function (err, result) {
        if (err) {
            console.log(err);
            res.write("<tr>");
            res.write("<td>find error.</td>");
            res.write("</tr>");
            res.write("</center>");
            res.write("</body>");
            res.write("</html>");
            res.end();
            //Close connection
            MongoClient.close();
        } else if (result.length) {
            var rs1=JSON.stringify(result[0]);
            var rs=JSON.parse(rs1);

            console.log('find success result length ' + result.length);
            console.log('find success ' + rs1);
            res.write("<table border=\"1\">");
            res.write("<tr>");
            res.write("<td> aid </td>");
            res.write("<td> cate </td>");
            res.write("<td> cost </td>");
            res.write("<td> date </td>");
            res.write("</tr>");
            res.write("<tr>");
            res.write("<td>" + rs.aid + " </td>");
            res.write("<td>" + rs.cate + " </td>");
            res.write("<td>" + rs.cost + " </td>");
            res.write("<td>" + rs.date + " </td>");
            res.write("</tr>");

            rs1=JSON.stringify(result[1]);
            rs=JSON.parse(rs1);
            res.write("<tr>");
            res.write("<td>" + rs.aid + " </td>");
            res.write("<td>" + rs.cate + " </td>");
            res.write("<td>" + rs.cost + " </td>");
            res.write("<td>" + rs.date + " </td>");
            res.write("</tr>");

            rs1=JSON.stringify(result[2]);
            rs=JSON.parse(rs1);
            res.write("<tr>");
            res.write("<td>" + rs.aid + " </td>");
            res.write("<td>" + rs.cate + " </td>");
            res.write("<td>" + rs.cost + " </td>");
            res.write("<td>" + rs.date + " </td>");
            res.write("</tr>");

            rs1=JSON.stringify(result[3]);
            rs=JSON.parse(rs1);
            res.write("<tr>");
            res.write("<td>" + rs.aid + " </td>");
            res.write("<td>" + rs.cate + " </td>");
            res.write("<td>" + rs.cost + " </td>");
            res.write("<td>" + rs.date + " </td>");
            res.write("</tr>");

            res.write("</table>");
            res.write("</center>");
            res.write("</body>");
            res.write("</html>");
            res.end();
            //Close connection
            MongoClient.close();
        } else {
            res.write('No document with id '+ data.empid +'.');
        }
    });
}

function addEmployeeForm(req,res,data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<html>");
        res.write("<body style='background-color:lightyellow;'> ");
        res.write("<center>");
        res.write("<form method='POST' >");
        res.write("<legend><h2><center> Add New Employee </center></h2></legend>");
        res.write("<table>");
    res.write("<tr>");
        res.write("<p><td><label for='value'>First Name                   :</label></td>");
        if ( data && data.fname ){
                res.write("<td><input type='text' id='fname' name='fname' value="+ data.fname +"></td>");
        }
        else{
                res.write("<td><input type='text' id='fname' name='fname' value=''></td>");
        }
        res.write("</p>");
    res.write("</tr>");
    res.write("<tr>");
        res.write("<p><td><label for='value'>Last Name                    :</label></td>");
        if ( data && data.lname ){
                res.write("<td><input type='text' id='lname' name='lname' value="+ data.lname +"></td>");
        }
        else{
                res.write("<td><input type='text' id='lname' name='lname' value=''></td>");
        }
        res.write("</p>");
    res.write("</tr>");
    res.write("<tr>");
        res.write("<p><td><label for='value'>ID                           :</label></td>");
        if ( data && data.empid ){
                res.write("<td><input type='text' id='empid' name='empid' value="+ data.empid +"></td>");
        }
        else{
                res.write("<td><input type='text' id='empid' name='empid' value=''></td>");
        }
        res.write("</p>");
        res.write("</tr>");
    res.write("<tr>");
        res.write("<p><td><label for='value'>Department                            :</label></td>");
        if ( data && data.dept ){
                res.write("<td><input type='text' id='dept' name='dept' value="+ data.dept +"></td>");
        }
        else{
                res.write("<td><input type='text' id='dept' name='dept' value=''></td>");
        }
        res.write("</p>");
        res.write("</tr>");
    res.write("<tr>");
        res.write("<p><td><label for='value'>Designation                           :</label></td>");
        if ( data && data.dsgn ){
                res.write("<td><input type='text' id='dsgn' name='dsgn' value="+ data.dsgn +"></td>");
        }
        else{
                res.write("<td><input type='text' id='dsgn' name='dsgn' value=''></td>");
        }
        res.write("</p>");
        res.write("</tr>");
    res.write("<tr>");
        res.write("<p><td><label for='value'>Salary                                :</label></td>");
        if ( data && data.sal ){
                res.write("<td><input type='text' id='sal' name='sal' value="+ data.sal +"></td>");
        }
        else{
                res.write("<td><input type='text' id='sal' name='sal' value=''></td>");
        }
        res.write("</p>");
        res.write("</tr>");
    res.write("<tr>");
        res.write("<td><input type='submit' value='Add'></td>");
        res.write("</tr>");
        res.write("<tr>");
        res.write("<td><input type='button' onclick=\"location.href='/'\" value='Go to Homepage' /></td>");
        res.write("</tr>");

        if (data) {
                MongoClient.connect(url, function (err, db) {
                        if (err) {
                                console.log('Unable to connect to the mongoDB server. Error:', err);
                        } else {
                                //HURRAY!! We are connected. :)
                                console.log('Connection established to', url);

                                // Get the documents collection
                                const database = db.db('mymondb');
                                console.log('This is db: ',database);
                                var collection = database.collection('employee');
                                console.log('This is Collection: ',collection);
                                //Add employee
                                var employee = {firstname: data.fname,lastname:data.lname , id: data.empid ,dept:data.dept,dsgn: data.dsgn,Salary:data.sal };

                                // Insert some users
                                collection.insert(employee, function (err, result) {
                                        if (err) {
                                                console.log(err);
                                                res.write("<tr>");
                                                res.write("<td> Added employee with id  " + data.empid + " into the employee collection failed.</td>");
                                                res.write("</tr>");

                                        } else {

                                                res.write("<tr>");
                                                res.write("<td> Added employee with id  " + data.empid + " into the employee collection.</td>");
                                                res.write("</tr>");

                                        }
                                        res.write("<table>");
                                        res.write("</form>");
                                        res.write("</center>");
                                        res.write("</body>");
                                        res.write("</html>");
                                        res.end();
                                        //Close connection
                                        db.close();
                                });
                        }
                });
        }

        }

function getEmployeeForm(req,res,data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<html>");
        res.write("<body style='background-color:lightyellow;'> ");
        res.write("<center>");
        res.write("<form method='POST' >");
        res.write("<legend><h1><center> Get Employee Information </center></h1></legend>");

        // Key and value
        res.write("<p><label for='key'>Emp Id                   :</label>");
        if ( data && data.empid ){
                res.write("<td><input type='text' id='empid' name='empid' value="+ data.empid +"></td>");
        }
        else{
                res.write("<td><input type='text' id='empid' name='empid' value=''></td>");
        }
        res.write("</p>");
        res.write("<input type='submit' value='Get'>");
        res.write("<input type='button' onclick=\"location.href='/'\" value='Go to Homepage' />");
        res.write("</form>");
        if (data) {
        MongoClient.connect(url, function (err, db) {
                  if (err) {
                    console.log('Unable to connect to the mongoDB server. Error:', err);
                  } else {
                    //HURRAY!! We are connected. :)
                    console.log('Connection established to', url);

                    // Get the documents collection
                    const database = db.db('mymondb');
                    var collection = database.collection('employee');

                    // Insert some users
                    collection.find({id: data.empid}).toArray(function (err, result) {
                      if (err) {
                        console.log(err);
                      } else if (result.length) {

                        res.write('Found the employee with id '+ data.empid);
                        var rs1=JSON.stringify(result[0]);
                        var rs=JSON.parse(rs1);
                        res.write("<table border=\"1\">");
                                res.write("<tr>");
                                res.write("<td> First Name </td>");
                                res.write("<td> Last Name </td>");
                                res.write("<td> ID </td>");
                                res.write("<td> Department </td>");
                                res.write("<td> Designation </td>");
                                res.write("<td> Salary </td>");
                                res.write("</tr>");
                                res.write("<tr>");
                                res.write("<td>" + rs.firstname + " </td>");
                                res.write("<td>" + rs.lastname + " </td>");
                                res.write("<td>" + rs.id + " </td>");
                                res.write("<td>" + rs.dept + " </td>");
                                res.write("<td>" + rs.dsgn + " </td>");
                                res.write("<td>" + rs.Salary + " </td>");
                                res.write("</tr>");
                      } else {
                          res.write('No document with id '+ data.empid +'.');
                      }
                      res.write("</center>");
                      res.write("</body>");
                      res.write("</html>");
                      res.end();
                      //Close connection
                      db.close();
                    });
                  }
                });
        }

}

function updateEmployeeForm(req,res,data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<form method='POST'>");
        res.write("<body style='background-color:lightyellow;'> ");
        res.write("<center>");
        res.write("<legend><h1> Update Employee </h1></legend>");
        res.write("<table>");
        res.write("<tr>");
        res.write("<p><td><label for='key'>Emp Id                   :</label></td>");
        if ( data && data.empid ){
                res.write("<td><input type='text' id='empid' name='empid' value="+ data.empid +"></td>");
        }
        else{
                res.write("<td><input type='text' id='empid' name='empid' value=''></td>");
        }
        res.write("</p>");
        res.write("</tr>");
        res.write("<tr>");
        res.write("<p><td><label for='key'>Designation                   :</label></td>");
        if ( data && data.dsgn ){
                res.write("<td><input type='text' id='dsgn' name='dsgn' value="+ data.dsgn +"></td>");
        }
        else{
                res.write("<td><input type='text' id='dsgn' name='dsgn' value=''></td>");
        }
        res.write("</p>");
        res.write("</tr>");
        res.write("<tr>");
        res.write("<p><td><label for='key'>Salary                   :</label></td>");
        if ( data && data.sal ){
                res.write("<td><input type='text' id='sal' name='sal' value="+ data.sal +"></td>");
        }
        else{
                res.write("<td><input type='text' id='sal' name='sal' value=''></td>");
        }
        res.write("</p>");
        res.write("</tr>");
        res.write("<td><input type='submit' value='Update'></td>");
        res.write("<tr>");
        res.write("<td><input type='button' onclick=\"location.href='/'\" value='Go to Homepage' /></td>");
        res.write("</tr>");
        res.write("</table>");
        res.write("</form>");
        if (data) {
                MongoClient.connect(url, function (err, db) {
                        if (err) {
                                console.log('Unable to connect to the mongoDB server. Error:', err);
                        } else {
                                // Get the documents collection
                                const database = db.db('mymondb');
                                var collection = database.collection('employee');

                                collection.update({id: data.empid}, {$set: {dsgn:data.dsgn,Salary:data.sal}}, function (err, numUpdated) {
                                          if (err) {
                                            console.log(err);
                                          } else if (numUpdated) {
                                            res.write('Updated employee with id '+ data.empid +'.');
                                      } else {
                                          res.write('No document with id '+ data.empid +'.');
                                      }
                                          res.write("</center>");
                                          res.write("</body>");
                                      res.write("</html>");
                                      res.end();
                                          //Close connection
                                          db.close();
                                        });
                        }
                });
        }

}

function deleteEmployeeForm(req,res,data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<form name='ActionForm' method='POST'>");
        res.write("<body style='background-color:lightyellow;'> ");
        res.write("<center>");
        res.write("<legend><h1> Delete Employee Information </h1></legend>");
        // Key and value
        res.write("<p><label for='key'>Emp Id                   :</label>");
        if ( data && data.empid ){
                res.write("<td><input type='text' id='empid' name='empid' value="+ data.empid +"></td>");
        }
        else{
                res.write("<td><input type='text' id='empid' name='empid' value=''></td>");
        }
        res.write("</p>");
        res.write("<input type='submit' value='Delete'>");
        res.write("<input type='button' onclick=\"location.href='/'\" value='Go to Homepage' />");
        res.write("</form>");
        if (data) {
                MongoClient.connect(url, function (err, db) {
                        if (err) {
                                console.log('Unable to connect to the mongoDB server. Error:', err);
                        } else {

                                console.log('Connection established to', url);

                                // Get the documents collection
                                const database = db.db('mymondb');
                                var collection = database.collection('employee');

                                console.log(data.empid);

                                // Check if empId is present or not.
                                var flag=false;
                                collection.find({id: data.empid}).toArray(function(err,result){

                                        if(err){console.log(err);
                                        }else if(!result.length){
                                                flag=true;
                                                res.write('</br> No document with id '+data.empid+'.');
                                        }
                                });
                                // Insert some users
                                collection.remove({id: data.empid},function (err,deletedCount) {
                                        console.log(deletedCount);
                                        if (err) {
                                                console.log(err);
                                        } else if (deletedCount && !flag) {
                                                res.write('Document deleted with id '+ data.empid +'.');
                                        }//else {
                                        //
                                        //      res.write('No document with id '+ data.empid +'.');
                                      //}
                                          res.write("</center>");
                                          res.write("</body>");
                                      res.write("</html>");
                                      res.end();
                                        //Close connection
                                          db.close();
                                        });
                        }
                });
        }

}

http.createServer(function (req, res) {

        switch(req.method){
        case 'GET':
                if ( req.url === '/' ){
                            createHomePage(req,res);
                            res.end();
                }else if ( req.url === '/AddPayments'){
            addPayments(req,res);
                        // res.end();
        }else if ( req.url === '/AddEmployee' ){
                        addEmployeeForm(req,res);
                        res.end();
                }else if ( req.url === '/UpdateEmployee' ){
                        updateEmployeeForm(req,res);
                        res.end();
                }else if ( req.url === '/GetEmployee' ){
                        getEmployeeForm(req,res);
                        res.end();
                }else if ( req.url === '/DeleteEmployee' ){
                        deleteEmployeeForm(req,res);
                        res.end();
                }

                break;
        case 'POST':
                if ( req.url === '/AddEmployee'){
                        var body = '';
                        req.on('data',function(data){
                                body += data;
                                if ( body.length > 1e7 ){
                                        res.end();
                                }
                        });
                        req.on('end',function(data){
                                var formData=qs.parse(body);
                                console.log(formData);
                                addEmployeeForm(req,res,formData);

                        });

        }else if ( req.url === '/UpdateEmployee'){
                        var body = '';
                        req.on('data',function(data){
                                body += data;
                                if ( body.length > 1e7 ){
                                        res.end();
                                }
                        })
                        req.on('end',function(data){
                                var formData=qs.parse(body)
                                updateEmployeeForm(req,res,formData);
                        })
                }else if ( req.url === '/GetEmployee'){
                        var body = '';
                        req.on('data',function(data){
                                body += data;
                                if ( body.length > 1e7 ){
                                        res.end();
                                }
                        })
                        req.on('end',function(data){
                                var formData=qs.parse(body)
                                getEmployeeForm(req,res,formData);
                        })
                }else if ( req.url === '/DeleteEmployee'){
                        var body = '';
                        req.on('data',function(data){
                                body += data;
                                if ( body.length > 1e7 ){
                                        res.end();
                                }
                        })
                        req.on('end',function(data){
                                var formData=qs.parse(body)
                                deleteEmployeeForm(req,res,formData);
                        })
                }
                break
        default:
                break;

        }

}).listen(port);

console.log('Server running at http://127.0.0.1:'+port);
