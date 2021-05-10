import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {DataItem, DataItemType} from '../../common/model/data-item';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Notam} from '../../notam/domain-model/notam';
import {AirportRunway} from './airport-runway';
import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {AirportRadio} from './airport-radio';
import {Webcam} from '../../webcam/domain-model/webcam';
import {AirportChart} from './airport-chart';
import {AirportFeature} from './airport-feature';
import {AirportType} from './airport-type';


export class Airport extends DataItem  {
    public runways: AirportRunway[];
    public radios: AirportRadio[];
    public webcams: Webcam[];
    public charts: AirportChart[];
    public features: AirportFeature[];
    public notams: Notam[];
    public metarTaf: MetarTaf;


    constructor(
        public id: number,
        public type: AirportType,
        public name: string,
        public icao: string,
        public country: string,
        public position: Position2d,
        public elevation: Length
    ) {
        super();
        this.runways = [];
        this.radios = [];
        this.webcams = [];
        this.charts = [];
        this.features = [];
        this.notams = [];
    }


    public get dataItemType(): DataItemType {
        return DataItemType.airport;
    }


    public get hasRunways(): boolean {
        return (this.runways != null && this.runways.length > 0);
    }


    public get hasRadios(): boolean {
        return (this.radios != null && this.radios.length > 0);
    }


    public get hasFeatures(): boolean {
        return (this.features != null && this.features.length > 0);
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
