import { Response } from './response';

export interface FileData {
    filename: string;   
    fileurl:string
  }

export class SearchFileResponse extends Response{
    filenameList: FileData[];
}
 