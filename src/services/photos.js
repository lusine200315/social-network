const PhotosModel = require('../model/photos');

class PhotosService {
    static async getPhoto(id) {
        try {
            if(!id) {
                return null;
            };

            const result = await PhotosModel.findOne({_id: id});
            if(!result) {
                return null;
            };
            
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

        console.log(img, 1111);
        const result = await PhotosModel(img);
        return result.save();
    };
};

module.exports = PhotosService;