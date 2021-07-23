const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const connection = `mongodb+srv://phonebook:${password}@cluster0.46jnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
});

const PhoneBook = mongoose.model("PhoneBook", phoneBookSchema);

if (process.argv.length > 3) {
  const info = new PhoneBook({
    name: process.argv[3],
    number: process.argv[4]
  });

  info.save().then((result) => {
    console.log(`added ${info.name} number ${info.number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  console.log("phonebook:");
  PhoneBook.find({}).then((results) => {
    results.forEach((info) => {
      console.log(info.name, info.number);
    });
  });
}
