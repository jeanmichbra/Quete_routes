
const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");
const bodyParser = require("body-parser");



app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.send("Bienvenue sur Express");
});

app.get("/api/movies", (req, res) => {
  connection.query("SELECT * from movie", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des films");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/movies/names", (req, res) => {
  connection.query("SELECT name from movie", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des films");
    } else {
      res.json(results);
    }
  });
});

app.post("/api/movies", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO movie SET ?", formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un film");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put("/api/movies/:id", (req, res) => {
  const idMovie = req.params.id;
  connection.query(
    "UPDATE movie SET ? WHERE id = ?",
    [req.body, idMovie],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un film");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.delete("/api/movies/:id", (req, res) => {
  const idMovie = req.params.id;
  connection.query("DELETE FROM movie WHERE id = ?", [idMovie], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un film");
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});

