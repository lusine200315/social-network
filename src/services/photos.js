const PhotosModel = require('../model/photos');

class PhotosService {
    static async getPhoto() {
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

    static async addPhoto(img) {
        if(!img) {
            return null;
        };
        const result = await PhotosModel(img)
        return result;
    };
};

module.exports = PhotosService;