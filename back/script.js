// GET /characters ==> Get all characters
// POST /characters ==> Create a new character
// GET /characters/:id ==> Get a character by ID
// PUT /characters/:id ==> Update a character by ID
// DELETE /characters/:id ==> Delete a character by ID

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");


const app = express();
const PORT = 8080;
const dbPath = path.join(__dirname, "./characters.json");

app.use(bodyParser.json());
app.use(cors());

const readData = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));
const writeData = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
const data = readData();
const characters = data.characters;

app.get("/characters", (req, res) => {
    try {
        res.json(characters);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.post("/characters", (req, res) => {
    try {
        const newCharacter = {
            ...req.body,
        };
        if (!newCharacter.name || !newCharacter.id || !newCharacter.realName || !newCharacter.universe) {
            res.status(400).json({error: "Missing Information"});
        }

        characters.push(newCharacter);
        writeData(data);
        res.status(201).json({message: "Characters Added Successfully"});
    }
    catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.get("/characters/:id", (req, res) => {
    try {
        const characterId = req.params.id;
        const characterPosition = characterId - 1;
        if (characterId < 0 || characterId == 0 || characterId > characters.length) {
            res.status(400).json({error: "No character found"});
        }
        res.json(characters[characterPosition]);
        }
        catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.put("/characters/:id", (req, res) => {
    const characterId = req.params.id;
    const characterPosition = characterId - 1;
    const updatedCharacter = {
        id: characters[characterPosition].id,
        name: req.body.name,
        realName: req.body.realName,
        universe: req.body.universe,
    };
    try {
        if (characterId < 0 || characterId == 0 || characterId > characters.length) {
            res.status(400).json({error: "No character found"});
        }
        else if(!updatedCharacter.name || !updatedCharacter.realName || !updatedCharacter.universe) {
            res.status(400).json({error: "Missing Information"});
        }
        characters[characterPosition] = updatedCharacter;
        writeData(data);
        res.status(201).json({message: "Character updated"});
    }
    catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.delete("/characters/:id", (req, res) => {
    const characterId = req.params.id;
    const characterPosition = characterId - 1;
    try {
        if (characterId < 0 || characterId == 0 || characterId > characters.length) {
            res.status(400).json({error: "No character found"});
        }
        characters.splice(characterId - 1, 1);
        writeData(data);
        res.status(201).json({message: "Character deleted"});
    }
    catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.listen(8080);