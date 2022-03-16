const express = require('express');
const router = express.Router();

router.use(express.json());

const Comments = require("../models/Comments");

//Comments
router.post("/newComment", async (req, res) => { 
    try {
        const {User: username, Date: date, Content: comment, Movie: movie} = req.body;
        /*Append comment to database */
        const newComment = await Comments({User: username, Date: date, Content: comment, Movie: movie});
        await newComment.save();
        res.json(newComment);
    } catch (error) {
        console.log(error.message);
    }
})

router.post("/newReply", async (req, res) => { 
    try {
        const {_id: id, User: username, Date: date, Content: comment} = req.body;
        const reply = await new Comments({User: username, Date: date, Content: comment});

        console.log(reply);
        const coment =  await Comments.findOne({_id: id});
        
        coment.Replies.push(reply);
        coment.rep = true;
 
        await coment.save();
        res.json(coment);

    } catch (error) {
        console.log(error.message);
    }
})

router.patch("/commentLikes", async (req, res) => {
    try {
        const {_id: id} = req.body;
        const comment =  await Comments.findOne({_id: id});

        comment.Likes = comment.Likes + 1;
        await comment.save(); 
        res.json(comment);
    } catch (error) {
        console.log(error.message);
    }
})

router.get("/comments/:movie", async (req, res) => {
    /*Get comments*/
    try {
        const movie = req.params.movie;
        const comments = await Comments.find({Movie: movie});
        res.json(comments);
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;