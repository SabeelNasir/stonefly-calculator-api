import multer from 'multer';
import uuid from 'uuid';
import * as path from 'path';
import { Request, Response } from "express";
import { AppConstants } from '../config/AppConstants';
import AWS from 'aws-sdk';
import moment from 'moment'
import fs from 'fs'

AWS.config.update({ accessKeyId: AppConstants.AWS.ID, secretAccessKey: AppConstants.AWS.SCECRET });

export class FileUtil {
    static storage: any;
    static upload: any;

    static uploader() {
        const folderPath = path.join(__dirname + '/../../' + AppConstants.FILE_UPLOAD_FOLDER)
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
        }
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, folderPath)
            },
            filename: function (req, file, cb) {
                cb(null, uuid.v4() + path.extname(file.originalname));
            }
        })
        this.upload = multer({ storage: this.storage });
        return this.upload;
    }
    /** Currently Idle */
    static uploadOnAwsBucket(folderName: String, fileName: string, file: File) {
        fileName = moment().unix() + "_" + file.name;
        let s3 = new AWS.S3()
        if (process.env.NODE_ENV == 'development') {
            var bucketName = AppConstants.AWS.BUCKET_DEV
        } else {
            var bucketName = AppConstants.AWS.BUCKET_PROD
        }
        s3.putObject({
            Bucket: ``,
            Key: fileName,
            Body: file.stream,
            ContentType: "image/jpeg",
            ACL: "public-read"

        }, (res) => {

        })

    }

}