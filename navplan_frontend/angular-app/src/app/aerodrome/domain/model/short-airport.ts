import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {AirportType} from './airport-type';
import {AirportFeatureType} from './airport-feature-type';


export class ShortAirport extends DataItem  {
    constructor(
        public id: number,
        public type: AirportType,
        public icao: string,
        public position: Position2d,
        public rwy1Direction: number,
        public rwy1Surface: string,
        public featureTypes: AirportFeatureType[]
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
        return (this.type === AirportType.HELI_CIVIL || this.type === AirportType.HELI_MIL || this.type === AirportType.HELI_MOUNTAIN || this.type === AirportType.HELI_HOSPITAL);
    }


    public get isMilitary(): boolean {
        return (this.type === AirportType.AD_MIL || this.type === AirportType.HELI_MIL);
    }


    public get isMountainous(): boolean {
        return (this.type === AirportType.HELI_MOUNTAIN || this.type === AirportType.AF_MOUNTAIN);
    }


    public get isWater(): boolean {
        return (this.type === AirportType.AF_WATER);
    }


    public get isClosed(): boolean {
        return (this.type === AirportType.AD_CLOSED);
    }


    public get showRunways(): boolean {
        return this.hasRunways && !this.isClosed && !this.isHeliport && !this.isMountainous && !this.isWater;
    }
}
