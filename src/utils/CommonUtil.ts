import { AppConstants } from "../config/AppConstants";
import uniqid from "uniqid";
import * as otplib from 'otplib';
import crypto from 'crypto';

const padNo = (num: number, size?: number) => {
    var s = String(num);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

export class CommonUtil {
    constructor() { }
    static getApiId(id: String) {
        return `${AppConstants.APP_NAME}.api.${id}`;
    }
    static getUuid(prefix?: string) {
        return uniqid.time(prefix);
    }
    static getTimeFromSlot(slotObj: any) {
        let time = '';
        time = (slotObj.hour >= 0) ? time + slotObj.hour.toString() : '00';
        time = (slotObj.minute >= 0) ? time + ':' + padNo(slotObj.minute).toString() : time + ':00';
        return time;
    }
    static generateOtp() {
        console.log(otplib);
        let authenticator: any = otplib.authenticator;
        authenticator.options = { crypto };

        return authenticator.generate(AppConstants.OTP_KEY).toString().slice(0, 4);
    }

    static getBucketName() {
        if (process.env.NODE_ENV == "development") {
            var bucketName = AppConstants.AWS.BUCKET_DEV;
        } else {
            var bucketName = AppConstants.AWS.BUCKET_PROD;
        }
        return bucketName;
    }

}
