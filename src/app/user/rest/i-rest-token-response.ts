import {IRestSimpleResponse} from './i-rest-simple-response';


export interface IRestTokenResponse extends IRestSimpleResponse {
    email: string;
    token: string;
}
