const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const UserRoute = require("./routes/user");
const TaskRoute = require("./routes/task");
const DashboardRoute = require("./routes/dashboard");
const { authenticationMiddleware } = require('./middlewares/auth');

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

const connectToDB = async () => mongoose.connect(process.env.MONGO_URI);

const listenToPort = (port) => new Promise((resolve, reject) => {
   app.listen(port, (err) => {
       if (err) {
           reject(err);
       }
       resolve();
   });
});

app.use('/user', UserRoute);
app.use('/task', authenticationMiddleware, TaskRoute);
app.use('/index', authenticationMiddleware, DashboardRoute)
app.get('*', (_, res) => res.redirect('/index'));
app.post('*', (_, res) => res.redirect('/index'));

async function main() {
   try {
      const port = 8080;
      await connectToDB();
      await listenToPort(port); 
      console.log(`Server started on port ${port}`);
   } catch (error) {
      console.log("Faled to start server", error);
   }
}



//home page
app.get("/index", (req, res) => {
   console.log(req.body);
   res.render("index.ejs");
});

main();



