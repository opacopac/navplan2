import {IRestOriginalFileParameters} from '../model/i-rest-original-file-parameters';
import {OriginalFileParameters} from '../../domain/model/original-file-parameters';
import {RestPdfParametersConverter} from './rest-pdf-parameters-converter';


export class RestOriginalFileParametersConverter {
    public static fromRest(restOrigFileParameters: IRestOriginalFileParameters): OriginalFileParameters {
        return new OriginalFileParameters(
            restOrigFileParameters.importFilename,
            restOrigFileParameters.importChecksum,
            RestPdfParametersConverter.fromRest(restOrigFileParameters.pdfParameters),
        );
    }


    public static toRest(origFileParameters: OriginalFileParameters): IRestOriginalFileParameters {
        return {
            importFilename: origFileParameters.importFilename,
            importChecksum: origFileParameters.importChecksum,
            pdfParameters: RestPdfParametersConverter.toRest(origFileParameters.pdfParameters),
        };
    }
}
