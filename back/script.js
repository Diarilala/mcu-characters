// GET /characters ==> Get all characters
// POST /characters ==> Create a new character
// GET /characters/:id ==> Get a character by ID
// PUT /characters/:id ==> Update a character by ID
// DELETE /characters/:id ==> Delete a character by ID

const express = require("express");

const app = express();
const data = require("./characters.json");
function createCharacter(id, name, realname, universe) {

}

app.get("/characters", (req, res) => {
    return res.status(200).json({"characters": data.characters});
})

app.post("/c", (req, res) => {
    createCharacter(req.body);
})

app.get("/characters/:id", (req, res) => {})

app.put("characters/:id", (req, res) => {})

app.delete("characters/:id", (req, res) => {})

app.listen(8080);