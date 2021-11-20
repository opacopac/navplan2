import {Timestamp} from '../../common/geo-math/domain-model/quantities/timestamp';
import {SmaStation} from './sma-station';
import {Temperature} from '../../common/geo-math/domain-model/quantities/temperature';
import {Time} from '../../common/geo-math/domain-model/quantities/time';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {Speed} from '../../common/geo-math/domain-model/quantities/speed';
import {Pressure} from '../../common/geo-math/domain-model/quantities/pressure';
import {DataItem, DataItemType} from '../../common/model/data-item';


export class SmaMeasurement extends DataItem {
    constructor(
        public station: SmaStation,
        public measurementTime: Timestamp,
        public temperature: Temperature,
        public sunTime: Time,
        public precipitationMM: number,
        public windDirection: Angle,
        public windSpeed: Speed,
        public windGusts: Speed,
        public qnh: Pressure,
        public humidityProc: number
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.smaMeasurement;
    }
}
