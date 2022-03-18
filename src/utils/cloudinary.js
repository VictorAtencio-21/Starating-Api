const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dzbvzxut7', 
    api_key: '545913137262276', 
    api_secret: 'bz3ZKa3dyxE31BaxAB3m2RSWI-M' 
  });

module.exports = cloudinary;