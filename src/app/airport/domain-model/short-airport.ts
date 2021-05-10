import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {DataItem, DataItemType} from '../../common/model/data-item';
import {AirportType} from './airport-type';


export class ShortAirport extends DataItem  {
    constructor(
        public id: number,
        public type: AirportType,
        public icao: string,
        public position: Position2d,
        public rwy1Direction: number,
        public rwy1Surface: string,
        public featureTypes: string[]
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.airport;
    }


    public get hasRunways(): boolean {
        return (this.rwy1Direction != null && this.rwy1Surface != null);
    }


    public get hasFeatures(): boolean {
        return (this.featureTypes != null && this.featureTypes.length > 0);
    }


    public get isHeliport(): boolean {
        return (this.type === AirportType.HELI_CIVIL || this.type === AirportType.HELI_MIL);
    }


    public get isMilitary(): boolean {
        return (this.type === AirportType.AD_MIL);
    }


    public get isClosed(): boolean {
        return (this.type === AirportType.AD_CLOSED);
    }

}
