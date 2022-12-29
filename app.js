const express = require("express");
const mongoose = require("mongoose");
const Ticket = require("./models/tickets");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const dburi =
  "mongodb+srv://Siddu:3645@cluster0.hc9mc.mongodb.net/Ticket?retryWrites=true&w=majority";

mongoose
  .connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
  
  var tickets = [];
  var mytickets = [];
  var data = [];

app.get("/home", (req, res) => {
  tickets.length = 0;
  res.render("home", { tickets });
});
app.get("/my-tickets", (req, res) => {
        res.render("my-tickets",{mytickets});   
} )   


app.post("/seatsavailable", (req, res) => {
  Ticket.find({ availability: "1" }).then((result) => {
    res.render("home", { tickets: result });
  });
});


app.post("/search", (req, res) => {
  var val = req.body.val;
  var cat = req.body.category;
  var query = {};
  query[cat] = val;
  data.length = 0;
  if (cat == "cost") {
    Ticket.find().then((result) => {
      result.forEach((r) => {
        if (r.cost <= val) {
          data.push(r);
        }
      });
      res.render("home", { tickets: data });
    });
  } 
  else if(cat =="name")
  {
    Ticket.find().then((result) => {
      result.forEach((r) => {
        if (r.name.includes(val.toUpperCase())) {
          data.push(r);
        }
      });
      res.render("home", { tickets: data });
    });
  }

  else {
    Ticket.findOne(query, function (err, item) {
      data.length = 0;
      if (item == null) {
        res.render("home", { tickets: data });
      } else {
        data.push(item);
        res.render("home", { tickets: data });
      }
    });
  }
});

app.post("/bookticket", (req, res) => {
  var no = req.body.no;
  Ticket.findOneAndUpdate({no:no},{availability:"0"},function (err, item) {
    if (err) {
      console.log(err);
    } else {
        mytickets.push(item);
      res.render("my-tickets", {mytickets });
    }
  });
});
