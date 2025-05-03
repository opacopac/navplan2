import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {ChartRegistration} from './chart-registration';
import {OriginalFileParameters} from './original-file-parameters';


export class AirportChart extends DataItem {
    constructor(
        public id: number,
        public airportIcao: string,
        public source: string,
        public name: string,
        public fileName: string,
        public extent: Extent2d,
        public originalFileParameters: OriginalFileParameters,
        public chartRegistration: ChartRegistration
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.airportChart;
    }
}
