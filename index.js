const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect to database:
connectDB();

app.use(express.json({extended: false}));

//Routes:
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(5000, function () {
    console.log(`Server running on port ${this.address().port}`);
});