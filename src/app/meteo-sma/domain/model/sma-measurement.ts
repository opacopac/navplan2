import {Timestamp} from '../../../geo-physics/domain/model/quantities/timestamp';
import {SmaStation} from './sma-station';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {DataItem, DataItemType} from '../../../common/model/data-item';


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
