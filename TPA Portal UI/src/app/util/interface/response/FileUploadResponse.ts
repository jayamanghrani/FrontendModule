import { Response } from './response';

export class FileUploadResponse extends Response{
    message: string;
    status: number;
    errorMessage :string;
}
