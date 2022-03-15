const express = require('express');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || 'localhost';

const userRoutes = require("./src/routes/userRoutes")
const movieRoutes = require("./src/routes/movieRoutes")
const commentsRoutes = require("./src/routes/commentsRoutes")

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());

//Routes
app.use(userRoutes);
app.use(movieRoutes);
app.use(commentsRoutes);

app.listen(PORT, () => console.log(`Estamos yuk en http://${HOST}:${PORT}`))