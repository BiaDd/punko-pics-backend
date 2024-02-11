const dotenv = require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getAllFiles, getFileUrl } = require('./SupabaseService')

// Default
router.get('/', (req, res) => {
    res.status(200).send("Server is online...")
})

// Get all the keys from bucket
router.get('/pictures', async (req, res) => {
    let result = await getAllFiles();
    if (result) {
        const keySize = result.length
        let contents = result.sort((a, b) => b.metadata.lastModified - a.metadata.lastModified)
        let pics = []
        for (let i = 0; i < keySize; i++) {
            pics.push({
                key: contents[i].name,
                url: await getFileUrl(contents[i].name),
                date: contents[i].metadata.lastModified
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
})

module.exports = router;