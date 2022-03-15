const express = require('express');
const router = express.Router();

router.use(express.json());

const Comments = require("../models/Comments");

//Comments
router.post("/newComment", async (req, res) => {
    const {username: username, date: date, comment: comment} = req.body;

    /*Append comment to database */
})

router.get("/comments/:movie", async (req, res) => {
    /*Get comments*/
    try {
        const movie = req.params.movie;
        const comments = await Comments.find({movie: movie});
        res.json(comments);
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;