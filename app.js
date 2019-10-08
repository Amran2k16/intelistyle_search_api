const express = require("express");
const port = process.env.PORT || 4000;
const fs = require("fs");

const obj = JSON.parse(fs.readFileSync("./intellistyledata.json", "utf8"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// console.log(result.length);

app.get("/", (req, res) => {
  res.send(obj);
});

app.post("/", (req, res) => {
  let search_params = req.body.search.split(" ");

  const matches = obj.filter(item => {
    let matchFound = true;
    for (index in search_params) {
      matchFound =
        matchFound &&
        item.product_title
          .toUpperCase()
          .includes(search_params[index].toUpperCase());
    }
    return matchFound;
  });
  res.send({ length: matches.length, matches });
});

app.listen(port, () => {
  console.log("Example app listening on port : " + port);
});
