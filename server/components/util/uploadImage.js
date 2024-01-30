import { createWriteStream } from 'fs';
import { GraphQLError } from 'graphql';
import { extname } from 'path';
import "dotenv/config";

export const uploadImage = async (_, { file, upload_path_name }, context) => {
    try {


        const allowedUploadPathNames = ['images'];
        if (!allowedUploadPathNames.includes(upload_path_name)) {
            return new GraphQLError(`Geçersiz dosya yolu!`, { extensions: { code: 400 } });
        }

        const { createReadStream, filename, mimetype } = await file.file;

        const allowedExtensions = ['.jpeg', '.jpg', '.png', '.heic'];
        const fileExtension = extname(filename).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            return new GraphQLError(`Geçersiz dosya tipi!`, { extensions: { code: 400 } });
        }

        const stream = createReadStream();


        const _maxFilesSize = process.env.SERVER_UPLOAD_IMAGE_MAX_SIZE;
        const maxFileSize = _maxFilesSize * 1024 * 1024;

        const timestamp = new Date().getTime();
        const newFilename = `${timestamp}${fileExtension}`;
        const path = `${process.env.SERVER_STATIC_PATH}/${upload_path_name}/${newFilename}`;

        let uploadStatus = false;

        try {
            uploadStatus = await new Promise((resolve, reject) => {
                const chunks = [];
                let totalSize = 0;

                stream
                    .on("data", function (chunk) {
                        totalSize += chunk.length;

                        if (totalSize > maxFileSize) {
                            reject(new GraphQLError(`Görsel boyutu sınırlarda değil! Maksimum dosya boyutu: ${_maxFilesSize} MB`, { extensions: { code: 400 } }));
                            stream.destroy();
                        } else {
                            chunks.push(chunk);
                        }
                    })
                    .once('error', (err) => {
                        reject(new GraphQLError(`Dosya okunurken bir hata oluştu: ${err}`, { extensions: { code: 500 } }));
                    })
                    .once('end', () => {
                        const buffer = Buffer.concat(chunks);
                        const writeStream = createWriteStream(path);

                        writeStream
                            .on('error', (error) => reject(new GraphQLError(`Dosya kaydedilirken bir hata oluştu: ${error.message}`, { extensions: { code: 500 } })))
                            .on('finish', () => resolve({ upload: true }));

                        writeStream.write(buffer);
                        writeStream.end();
                    });
            });
        } catch (error) {
            return new GraphQLError(`Yükleme sürecinde bir hata oluştu: ${error}`, {
                extensions: { code: 502 },
            });
        }


        if (uploadStatus) {
            return {
                url: process.env.PROJECT_URL + "/" + upload_path_name + "/" + newFilename,
                filename: newFilename,
                mimetype,
                encoding: 'utf-8'
            }
        }
        else {
            return new GraphQLError(`Yükleme süreci sonunda bir hata oluştu`);
        }

    } catch (error) {
        return new GraphQLError(`Yükleme sürecinde bir hata oluştu: ${error}`, {
            extensions: { code: 502 },
        });
    }
};
