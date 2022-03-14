const express = require('express');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || 'localhost';

const movieRoutes = require("./src/routes/movieRoutes.js")
const userRoutes = require("./src/routes/userRoutes.js")


/* Por definir si se utilizan o no:

const flash = require('express-flash')
const session = require('express-session')
*/

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());

/*Mongoose logic to connect to db */

//Routes
app.use(userRoutes);
app.use(movieRoutes);

app.listen(PORT, () => console.log(`Estamos yuk en http://${HOST}:${PORT}`))