const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect to database
connectDB();

app.use(express.json({extended: false}));

app.listen(5000, function () {
    console.log(`Server running on port ${this.address().port}`);
});