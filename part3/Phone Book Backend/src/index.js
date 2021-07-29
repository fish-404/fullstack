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

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new PhoneBook({
    name: body.name ? body.name : body.number,
    number: body.number
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number
  };

  PhoneBook.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true
  })
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

const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({
      error: "malformatted id"
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
