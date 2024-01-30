import { uploadImage } from '../components/util/uploadImage.js';

export const utils_Resolver = {
    Query: {
        hello: () => 'Hello World!'
    },
    Mutation: {
        uploadImage: uploadImage
    }
};