import {ChartRegistration} from './chart-registration';
import {OriginalFileParameters} from './original-file-parameters';

export class ChartSaveParameters {
    constructor(
        public chartUrl: string,
        public chartName: string,
        public originalFileParameters: OriginalFileParameters,
        public chartRegistration: ChartRegistration
    ) {
    }
}
