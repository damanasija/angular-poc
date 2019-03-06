const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Ticket = require("../models/ticket");
const Categories = require('../models/categories');
const Issues = require('../models/issues');
const ObjectId = require('mongodb').ObjectID;



const dataResponseMethod = (error, records) => {
  if(error) {
    console.log(error)
    res.status(500).send(error);
  } else {
    res.status(202).send(records);
  }
};

router.use((req, res, next) => {
  // console.log("Routing happens");
  next();
});

router.post("/signup", (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type
  });
  newUser.save((err, doc) => {
    if (err) {
      console.log(err.errmsg);
      return res.status(500).send(err);
    } else {
      res.status(201).send(doc);
      console.log(doc);
    }
  });
});

router.post("/login", (req, res) => {
  const query = User.where({
    $and: [{ username: req.body.username }, { password: req.body.password }]
  });
  query.findOne((err, foundUser) => {
    try {
      if (foundUser) {
        res.status(200).json(
          {
            "status": "1",
            "data": foundUser
          });

      } else {
        res.status(200).json({ "status": "0", "message": "Invalid" });
      }
    } catch (err) {
      res.status(200).json({ 'status': 0 });
    }
  });
});

router.post("/", (req, res) => {
  let newTicket = new Ticket({
    project: req.body.project,
    summary: req.body.summary,
    issue: req.body.issue,
    priority: req.body.priority,
    assigne: req.body.assigne,
    reporter: req.body.reporter
  });
  newTicket.save((err, doc) => {
    console.log(req.body.issue);
    if (err) {
      console.log(err);
      return;
    } else {
      res.send(doc);
      console.log(doc);
    }
  });
});

router.get('/get', (req, res, next) => {
  Categories.getAllCategories((err, categories) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to get categories' });
    }
    else {
      res.json({ success: true, mainCategories: categories });
    }
  });
})

router.get('/issue', (req, res, next) => {
  Issues.getAllIssues((err, issues) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to get Issue Data' });
    }
    else {
      res.json({ success: true, mainIssues: issues });
    }
  });
})

router.get('/assigne', (req, res, next) => {
  User.getAllUser((err, assignes) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to get Assigne Data' });
    }
    else {
      res.json({ success: true, mainAssignes: assignes });
    }
  });
})

router.get('/reporte', (req, res, next) => {
  User.getAllUser((err, reportes) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to get Reporte Data' });
    }
    else {
      res.json({ success: true, mainReportes: reportes });
    }
  });
})


//For Getting data on Dashboard
router.get('/', (req, res) => {
  Ticket.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
  });
})

router.get('/ticket/:id', (req, res) => {
  let id = req.params.id;
  console.log(id);
  if(!id) {
    console.log("id not present");
    return res.status(403).send("not authorized");
  }
  User.findById(id, (error, user) => {
    if(error) {
      console.log(error)
      res.status(500).send(error);
    } else {
      if(!user) {
        console.log("no such user");
        return res.status(404).send("user not found");
      }
      console.log(user);
      let type = user.type;
      if(type == undefined) {
        return res.status(403).send("not allowed");
      }
      if(type === "manager") {
        Ticket.find({}, (error, records) => {
          if(error) {
            console.log(error)
            return res.status(500).send(error);
          } else {
            console.log(records);
            return res.status(202).send(records);
          }
        });
      } else if(type === "developer" || type === "tester"){
        Ticket.find({reporter: user.username}, (error, records) => {
          if(error) {
            console.log(error)
            return res.status(500).send(error);
          } else {
            console.log(records);
            return res.status(202).send(records);
          }
        });
      } else {
        return res.status(404).send("user typo not found");
      }
    }
  });
});

//For update 
router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No Record with given id : ${req.param.id}`);

  var tik = {
    projectname: req.body.project,
    summary: req.body.summary,
    issue: req.body.issue,
    priority: req.body.priority,
    assigne: req.body.assigne,
    reporter: req.body.reporter,
  };
  Ticket.findByIdAndUpdate(req.param.id, { $set: tik }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Tiket update :' + JSON.parse(err, undefined, 2)); }
  });
});

//For delete 
router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.param.id))
    return res.status(400).send(`No record with given id ${req.param.id}`);

  Ticket.findByIdAndRemove(req.param.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log(`Error in Ticket Delete : ` + JSON.parse(err, undefined, 2)); }
  });
});


module.exports = router;
