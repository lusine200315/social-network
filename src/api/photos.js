const express = require('express');
const photosRouter = express.Router();

const PhotosService = require('../services/photos');

photosRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'No photo ID provided' });
        };

        const photo = await PhotosService.getPhoto(id);
        
        if (!photo) {
            return res.status(404).send('Photo not found');
        };

        res.set('Content-Type', photo.contentType);
        res.status(200).send(photo.data);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    };
});

module.exports = photosRouter;
