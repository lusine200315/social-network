const express = require('express');
const photosRouter = express.Router();

const PhotosService = require('../services/photos');

// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// photosRouter.post('/', upload.single('photo'), async (req, res) => {
//     try {
//         const photo = req.file.buffer;
//         if (!photo) {
//             return res.status(400).send({ message: 'No photo provided' });
//         };

//         const photoData = {
//             data: req.file.buffer,
//             contentType: req.file.mimetype,
//             postId: req.body.postId
//         };

//         const uploadedPhoto = await PhotosService.addPhoto(photoData);
//         if (uploadedPhoto) {
//             return res.status(201).send({ photo_id: uploadedPhoto._id });
//         };

//         return res.status(500).send({ message: 'Error uploading photo' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

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
    }
});

module.exports = photosRouter;
