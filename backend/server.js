const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: [
    'https://super-adventure-4j659gp47756fw7p-4200.app.github.dev',
    'https://super-adventure-4j659gp47756fw7p-80.app.github.dev',
    'http://localhost:4200',
    'http://localhost:80',
    'http://localhost'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

require("./app/routes/turorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
