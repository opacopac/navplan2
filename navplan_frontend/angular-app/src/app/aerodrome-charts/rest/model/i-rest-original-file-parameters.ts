import {IRestPdfParameters} from './i-rest-pdf-parameters';


export interface IRestOriginalFileParameters {
    importFilename: string;
    importChecksum: string;
    pdfParameters: IRestPdfParameters;
}
