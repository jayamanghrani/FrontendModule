
import { fileExtensions } from '../constants';
import { isNullOrUndefined } from 'util';
import { Message } from '../interface/model/message';

export class FileValidity {
    valid: boolean;
    message: string;
}

export const validateFile = (file: File): FileValidity => {
    let status: FileValidity = {
        valid: true,
        message: ""
    };
    let error : Message = new Message();
    console.log(file);
    if (isFileNull(file)) {
        console.error(error.nullFile);
        status.valid = false;
        status.message = error.nullFile;
    } else if (validateFileNameLength(file.name)) {
        console.error(error.filenameLength);
        status.valid = false;
        status.message = error.filenameLength;
    } else if (validateFileExtension(file.name)) {
        console.error(error.fileExtension);
        status.valid = false;
        status.message = error.fileExtension;
    } else if (validateEmptyFile(file.size)) {
        console.error(error.emptyFile);
        status.valid = false;
        status.message = error.emptyFile;
    } else if (validateFileSize(file.size)) {
        console.error(error.fileSize);
        status.valid = false;
        status.message = error.fileSize;
    }

    return status;
}

const isFileNull = (file: File): boolean => {
    if (isNullOrUndefined(file)) {
        return true;
    } else {
        return false;
    }
}

const validateFileNameLength = (filename: string): boolean => {
    if (filename.length < 4)
        return true
    else
        return false;
}

const validateFileExtension = (filename: string): boolean => {
    let extension: string = filename.slice(filename.lastIndexOf(".") + 1);
    console.log("Extension : " + extension);
    console.log(fileExtensions);
    let extFlag: boolean = true;
    fileExtensions.forEach(ext => {
        
        if (extension == ext) {
            console.log("valid");
            extFlag =  false;
        }
    })
    return extFlag;
}

const validateEmptyFile = (filesize: number): boolean => {
    if (filesize == 0) {
        return true;
    } else {
        return false;
    }
}

const validateFileSize = (filesize: number): boolean => {
    if (filesize > 10000000) {
        return true;
    } else {
        return false;
    }
}
