import {PdfParameters} from './pdf-parameters';


export class ChartUploadParameters {
    constructor(
        public file: File,
        public pdfParameters = PdfParameters.createDefault(),
    ) {
    }
}
