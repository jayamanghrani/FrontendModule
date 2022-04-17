import { Response } from './response';
import {SearchData} from '../model/searchdata';

export class SearchFolderResponse extends Response{
    foldernameList: SearchData[];
    
}