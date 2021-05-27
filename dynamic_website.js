var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const prompt = require('prompt-sync')();

console.log("\nDynamic website using Node and Express");

console.log("1.Insert");
console.log("2.Update");
console.log("3.Delete");
console.log("4.View all records");
const option = prompt('Enter your choice : ');
switch(option)
{
    case "1":
        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("WebProg");
            const name = prompt('Enter name : ');
            const pos = prompt('Enter position : ');
            const rating = prompt('Enter Max rating : ');
            var myobj = { Name:name, Position:pos, Max_Rating:rating};
            dbo.collection("Rating").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
          break;

    case "2":
        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("WebProg");
            const name = prompt('Enter Player name to modify : ');
            const newrat = prompt('Enter new Max Rating : ');
            var myquery = { Name:name };
            var newvalues = { $set: {Max_Rating:newrat} };
            dbo.collection("Rating").updateOne(myquery, newvalues, function(err, obj) {
              if (err) throw err;
              if(obj.result.n == 0)
              console.log("No records updated.");
            else
              console.log("Number of records updated:"+obj.result.n);
              db.close();
            });
          });
          break;

    case "3":
        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("WebProg");
            const name = prompt('Enter name to delete : ');
            var myquery = {Name:name};
            dbo.collection("Rating").deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              if(obj.result.n == 0)
                console.log("No matching records found");
              else
                console.log("Number of records deleted:"+obj.result.n);
              db.close();
            });
          });
          break;

    case "4":
        MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
            if (err) throw err;
            var dbo = db.db("WebProg");
            dbo.collection("Rating").find({}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              db.close();
            });
          });
          break;

    default :
          console.log("Invalid choice");

}
