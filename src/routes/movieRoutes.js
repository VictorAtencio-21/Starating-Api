const express = require('express');
const router = express.Router();

router.use(express.json());

const Movie = require("../models/Movie");

//Home
router.get("/allMovies", async (req, res) => {
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
router.get("/movies/:title", async (req, res) => {
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
})

//ONLY FOR DEVELOPMENT ROUTES
// ----------------------------------------------------------------------------
router.post("/posty", async (req, res) => {
    try {
        const {title: tit, genre: gen, rating: ranked, photos: img, director: direct, description: desc, length: len} = req.body;
        const newMovie = new Movie({title: tit, genre: gen, rating: ranked, photos: img, director: direct, description: desc, length: len});

        await newMovie.save();
        //console.table(newMovie);
        res.status(201).send("Registro de la peli exitosamente!")
    } catch (error) {
        console.log(error.message);
    }
});

router.delete("/del/:title", async (req, res) =>{
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

router.delete("/deleted", async (req, res) =>{
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