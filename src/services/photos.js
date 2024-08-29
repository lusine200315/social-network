const PhotosModel = require('../model/photos');

class PhotosService {
    static async getPhoto(photo) {
        try {
            if(!photo) {
                return null;
            };

            const result = await PhotosModel.findOne({_id: photo});
            return result.save();
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        };
    };
};

module.exports = PhotosService;