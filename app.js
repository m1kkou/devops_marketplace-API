const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const postingsRoutes = require('./routes/postings');
const authRoutes = require('./routes/auth');


const app = express();

app.use(bodyParser.json());

require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'images', // give cloudinary folder where you want to store images
    allowedFormats: ['jpg', 'png', 'jpeg'],
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(
    multer({ storage: storage, fileFilter: fileFilter }).single('image')
  );

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/postings', postingsRoutes);
app.use('/auth', authRoutes);

//Error handling:
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
.connect(
    'mongodb+srv://assd_marketplace-app:TsHMwP2_XwX4vtg@cluster0.e7tof.mongodb.net/Cluster0?retryWrites=true&w=majority'
    )
.then(result => { 
    app.listen(80);
})
.catch(err => {
    console.log(err)
});
