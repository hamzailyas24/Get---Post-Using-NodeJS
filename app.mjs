import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;

let users = [];

app.use(express.json());

app.use(cors());

app.use(morgan("short"));

app.use((req, res, next) => {
  console.log("Request Received", req.body);
  next();
});

app.use((req, res, next) => {
  console.log("Request Received");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome User!");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/user", (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.address) {
    res.status(400).send("Invalid Data");
  } else {
    users.push({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    });
    res.send("User Created");
  }
});

app.get("/user/:id", (req, res) => {
  if (users[req.params.id]) {
    res.send(users[req.params.id]);
  } else {
    res.send("User Not Found");
  }
});

app.put("/user/:id", (req, res) => {
  if (users[req.params.id]) {
    if (req.body.name) {
      users[req.params.id].name = req.body.name;
    }
    if (req.body.name) {
      users[req.params.id].email = req.body.email;
    }
    if (req.body.name) {
      users[req.params.id].email = req.body.email;
    }
    res.send(users[req.params.id]);
  } else {
    res.send("User Not Found");
  }
});

app.delete("/user/:id", (req, res) => {
  if (users[req.params.id]) {
    users[req.params.id] = {};
    res.send("User Deleted");
  } else {
    res.send("User Not Found");
  }
});

app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});
