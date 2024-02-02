require('dotenv').config;
const express = require('express');
const router = express.Router();

// Default
router.get('/', (req, res) => {
    res.status(200).send("Server is online...")
})

// Get all the keys from bucket
router.get('/pictures', async (req, res) => {
    if (req.headers['punkopics-api-key'] === process.env.PUNKOPICS_API_KEY || req.headers['punkopics-api-key'] === dotenv.parsed.PUNKOPICS_API_KEY) {
        let result = await getAllKeys()
        if (result) {
            const keySize = result.KeyCount
            let contents = result.Contents.sort((a, b) => b.LastModified - a.LastModified)
            let pics = []
            for (let i = 0; i < keySize; i++) {
                const date = new Date(contents[i].LastModified);
                pics.push({
                    key: contents[i].Key,
                    url: getPictureSignedUrl(contents[i].Key),
                    date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                })
            }
            res.status(200).json({
                status: "Success",
                size: keySize,
                pictures: pics
            })
        }
        else {
            res.status(200).json({
                status: "Failed"
            })
        }
    }
    else {
        res.status(403).json({
            error: "Unauthorized Access"
        })
    }
})