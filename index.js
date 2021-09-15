const express = require('express');

const app = express();

app.use(express.json({extended: false}));

app.listen(5000, function () {
    console.log(`Server running on port ${this.address().port}`);
});