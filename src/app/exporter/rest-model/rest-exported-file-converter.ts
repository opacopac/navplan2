import {IRestExportedFile} from './i-rest-exported-file';
import {ExportedFile} from '../domain-model/exported-file';


export class RestExportedFileConverter {
    public static fromRest(restExportedFile: IRestExportedFile): ExportedFile {
        return new ExportedFile(
            restExportedFile.filename,
            restExportedFile.relurl
        );
    }
}
