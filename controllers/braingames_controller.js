var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var puzzle = require("../models/braingames.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    puzzle.all(function(data) {
        var hbsObject = {
            puzzles: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/braingames", function(req, res) {
    puzzle.create([
        "name", "puzzled"
    ], [
        req.body.name, req.body.puzzled
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/braingames/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    puzzle.update({
        puzzled: req.body.puzzled
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;