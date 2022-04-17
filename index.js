const express = require("express");
const { faker } = require("@faker-js/faker");

const app = express();
const mysql = require("mysql");

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);
connection.query(
  "CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL) ENGINE=INNODB"
);

const port = 3000;

app.get("/", (req, res) => {
  addPeople();
  getPeople((results) => {
    console.log(JSON.stringify(results));
    let html = "<h1>Full Cycle Rocks!</h1><ul>";
    for (const result of results) {
      html += `<li>${result.name}</li>`;
    }
    html += "</ul>";
    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`Express na porta ${port}`);
});

function addPeople() {
  const sql = `INSERT INTO people(name) values('${faker.name.findName()}')`;
  connection.query(sql);
}

function getPeople(cb) {
  const sql = `SELECT name FROM people;`;
  connection.query(sql, (err, result, fields) => {
    cb(result);
  });
}
