require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PhoneBook = require("../models/phonebook");

app.use(cors());
app.use(express.json());
morgan.token("myToken", function (req, res) {
  return JSON.stringify({
    name: req.body.name,
    number: req.body.number
  });
});

app.use(
  morgan(function (tokens, req, res) {
    const logs = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms"
    ];
    if (req.method === "POST") {
      logs.push(tokens.myToken(req, res));
    }

    return logs.join(" ");
  })
);

app.get("/api/persons", (req, res) => {
  PhoneBook.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  PhoneBook.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(403).json({
      error: "Name Missing"
    });
  }

  if (!body.number) {
    return res.status(403).json({
      error: "Phone Number Missing"
    });
  }

  //if (persons.find((person) => person.name === body.name)) {
  //  return res.status(403).json({
  //    error: "Name Must be Unique"
  //  });
  //}

  const person = new PhoneBook({
    name: body.name ? body.name : body.number,
    number: body.number
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people <br/> ${Date()}`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
