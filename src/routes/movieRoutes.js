const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const verifyToken = require('../middleware/auth')

router.use(express.json());

const Movie = require("../models/Movie");

//Home
router.get("/allMovies", verifyToken, async (req, res) => {
    /*fetch all movies from most popular to least popular*/
    /*Show them*/

    try {
        let movies = await Movie.find({}).sort({"rating": -1});
        console.table(movies);
        res.json(movies)    
    } catch (error) {
        console.log(error.message);
    }
})

//Movie Page
router.get("/movie/:title", verifyToken, async (req, res) => {
    /*Obtain movie data for movie of title = nameMovie*/
    /*Show movie data */
    
    try {
        const {title: nameMovie} = req.params;
        
        let movies = await Movie.findOne({title: nameMovie});
        console.table(movies);
        res.json(movies)
    } catch (error) {
        console.log(error.message);
    }
})

router.patch("/movieRating", async (req, res) => {
    try {
        const {_id: id} = req.body;
        const movie =  await Movie.findOne({_id: id});

        movie.rating = movie.rating + 1;
        await movie.save(); 
        res.json(movie);
    } catch (error) {
        console.log(error.message);
    }
});

//ONLY FOR DEVELOPMENT ROUTES
// ----------------------------------------------------------------------------
router.post("/posty", verifyToken, upload.single("poster"), async (req, res) => {
    try {
        const {title: tit, genre: gen, rating: ranked, trailers: trailer } = req.body;

        const result = await cloudinary.uploader.upload(req.file.path);

        let newMovie = new Movie({
            title: req.body.tit, 
            genre: req.body.gen, 
            rating: req.body.ranked, 
            trailers: req.body.trailer,
            poster: result.secure_url,
            cloudinary_id: result.public_id,
        });

        await newMovie.save();
        //console.table(newMovie);
        res.status(201).json(newMovie);
    } catch (error) {
        console.log(error.message);
    }
});

router.delete("/del/:title", verifyToken, async (req, res) =>{
    try{
        const {title: tit} = req.params;

        const mov = await Movie.findOne({title: tit});
        if(mov){
            await mov.delete();
            res.status(200).json("Deleted Movie :o oops...")
        }
    }catch(error){
        console.log(error.message);
    }
})

router.delete("/deleted", verifyToken, async (req, res) =>{
    try {
        const db = mongoose.connection.db;
    
        const collections = await db.listCollections().toArray();
        collections
          .map((collection) => collection.name)
          .forEach(async (collectionName) => {
            db.dropCollection(collectionName);
          });
    
        res.sendStatus(200);
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
})
//-------------------------------------------------------------------------

module.exports = router;