const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const routes = require("./routers/routes");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());

mongoose.connect(`mongodb://localhost:27017/Mranal`, { useNewUrlParser: true, useCreateIndex: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to MongoDB"));
db.on("error", err => console.log(err));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret',
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`)
  next()
}

app.use(logRequestStart)

app.use("/routes", routes);
app.use(cookieParser());

app.listen(3000, () =>
  console.log(`listening to port:3000`)
);
