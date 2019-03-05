User -> 
    name
    password
    role -> [dev, tester]
    tickets -> [ _id ]

// tickets route
  req.body 
  {
      "name": "some_name",
  }

  ------------------------------
  let data;
  let ticketsQuery = Ticket.find({"reportTo": "some_name"});
  let promise = query.exec();
  promise.then((resultOfQuery) => {
      data = resultOfQuery;
  }).then((error) => {
      console.log(error);
      res.status(500).send(error);
  })
  res.status(200).send(data);
  
  