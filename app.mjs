import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

const DB =
  "mongodb+srv://hamzailyas:db1234@cluster0.8m2bm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  mongoose.connect(DB)

const User = mongoose.model("User", {
  name: String,
  email: String,
  address: String,
});

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(morgan("short"));

app.use((req, res, next) => {
  console.log("Request Received", req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome User!");
});

app.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (!err) {
      res.send(users);
    } else {
      res.status(500).send("error happened!");
    }
  });
});

app.post("/user", (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.address) {
    res.status(400).send("Invalid Data");
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    });

    newUser.save().then(() => {
      console.log("User Created Successfully");
      res.send("User Created");
    });
  }
});

app.get("/user/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (!err) {
      res.send(user);
    } else {
      res.status(500).send("error happened!");
    }
  });
});

app.put("/user/:id", (req, res) => {
  let updateObj = {};

  if (req.body.name) {
    updateObj.name = req.body.name;
  }
  if (req.body.email) {
    updateObj.email = req.body.email;
  }
  if (req.body.address) {
    updateObj.address = req.body.address;
  }

  User.findByIdAndUpdate(
    req.params.id,
    updateObj,
    { new: true },
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        res.status(500).send("error happened!");
      }
    }
  );
});

app.delete("/user/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send("User Deleted");
    } else {
      res.status(500).send("error happened!");
    }
  });
});

app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});
