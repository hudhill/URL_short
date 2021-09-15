const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortId');
const config = require('config');

const Url = require('../models/Url');

//POST request to /api/url/shorten
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base Url');
    }

    //Creating url code using shortid
    const urlCode = shortid.generate();

    //Check original url is valid
    if(validUrl.isUri(originalUrl)) {
        try {
            let url = await Url.findOne({ originalUrl });

            if(url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    originalUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid url');
    }
});

module.exports = router;