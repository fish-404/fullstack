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

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.statsu(400).send({
      error: "malformatted id"
    });
  }
  next(error);
};

app.use(errorHandler);

app.get("/api/persons", (req, res) => {
  PhoneBook.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  PhoneBook.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  PhoneBook.findByIdAndRemove(req.params.id)
    .then((reslut) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
    });
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

  const person = new PhoneBook({
    name: body.name ? body.name : body.number,
    number: body.number
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number
  };

  PhoneBook.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatePerson) => {
      res.json(updatePerson);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  PhoneBook.find({}).then((persons) => {
    res.send(`Phonebook has info for ${persons.length} people <br/> ${Date()}`);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
