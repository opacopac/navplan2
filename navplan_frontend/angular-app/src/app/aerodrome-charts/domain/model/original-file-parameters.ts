import {PdfParameters} from './pdf-parameters';


export class OriginalFileParameters {
    constructor(
        public importFilename: string,
        public importChecksum: string,
        public pdfParameters: PdfParameters
    ) {
    }
}
