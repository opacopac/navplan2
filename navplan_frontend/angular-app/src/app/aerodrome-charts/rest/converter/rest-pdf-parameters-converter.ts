import {IRestPdfParameters} from '../model/i-rest-pdf-parameters';
import {PdfParameters} from '../../domain/model/pdf-parameters';
import {RestAngleConverter} from '../../../geo-physics/rest/model/rest-angle-converter';


export class RestPdfParametersConverter {
    public static fromRest(restPdfParameters: IRestPdfParameters): PdfParameters {
        return new PdfParameters(
            restPdfParameters.page,
            RestAngleConverter.fromRest(restPdfParameters.rotation),
            restPdfParameters.dpi,
        );
    }


    public static toRest(pdfParameters: PdfParameters): IRestPdfParameters {
        return {
            page: pdfParameters.page,
            rotation: RestAngleConverter.toRest(pdfParameters.rotation),
            dpi: pdfParameters.dpi,
        };
    }
}
