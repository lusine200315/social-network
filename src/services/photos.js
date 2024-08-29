const PhotosModel = require('../model/photos');

class PhotosService {
    static async addPhoto(photo) {
        try {
            if(!photo) {
                return null;
            };

            const result = await PhotosModel(photo);
            return result.save();
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        };
    };
};

module.exports = PhotosService;
