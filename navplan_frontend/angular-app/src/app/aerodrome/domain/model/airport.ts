import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {MetarTaf} from '../../../metar-taf/domain/model/metar-taf';
import {Notam} from '../../../notam/domain/model/notam';
import {AirportRunway} from './airport-runway';
import {AirportRadio} from './airport-radio';
import {Webcam} from '../../../webcam/domain/model/webcam';
import {AirportFeature} from './airport-feature';
import {AirportType} from './airport-type';
import {AirportChart} from '../../../aerodrome-charts/domain/model/airport-chart';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';


export class Airport extends DataItem {
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
        public elevation: Altitude
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


    public getPosition(): Position2d {
        return this.position;
    }


    public get hasRunways(): boolean {
        return (this.runways != null && this.runways.length > 0);
    }


    public get hasRadios(): boolean {
        return (this.radios != null && this.radios.length > 0);
    }


    public get hasCharts(): boolean {
        return (this.charts != null && this.charts.length > 0);
    }


    public get hasFeatures(): boolean {
        return (this.features != null && this.features.length > 0);
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


    public findOppositeRunway(rwy: AirportRunway): AirportRunway {
        if (rwy == null || this.runways == null) {
            return null;
        }

        return this.runways.find(r => {
            return (r.direction === ((rwy.direction + 180) % 360))
                && (r.length.equals(rwy.length))
                && (r.width.equals(rwy.width))
                && (r.surface === rwy.surface)
                && ((rwy.isRight() && r.isLeft())
                    || (rwy.isLeft() && r.isRight())
                    || (rwy.isCenter() && r.isCenter())
                    || !rwy.isParallel()
                );
        });
    }
}
