import {IRestPdfParameters} from '../model/i-rest-pdf-parameters';
import {PdfParameters} from '../../domain/model/pdf-parameters';
import { Angle } from '../../../geo-physics/domain/model/quantities/angle';


export class RestPdfParametersConverter {
    public static fromRest(restPdfParameters: IRestPdfParameters): PdfParameters {
        return new PdfParameters(
            restPdfParameters.page,
            Angle.fromDeg(restPdfParameters.rotationDeg),
            restPdfParameters.dpi,
        );
    }


    public static toRest(pdfParameters: PdfParameters): IRestPdfParameters {
        return {
            page: pdfParameters.page,
            rotationDeg: pdfParameters.rotation.deg,
            dpi: pdfParameters.dpi,
        };
    }
}
