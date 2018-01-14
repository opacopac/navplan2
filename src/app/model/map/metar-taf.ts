import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';
import { MapItemGeometryType, MapItemModel, MapItemOlFeature } from './map-item-model';


export class MetarTafList {
    public items: MetarTaf[] = [];
}


export class MetarTaf implements MapItemModel {
    constructor(
        public ad_icao: string,
        public metar_obs_timestamp: number,
        public taf_obs_timestamp: number,
        public cloud_cover: string,
        public wx_cond: string,
        public wind_dir_deg: number,
        public wind_speed_kt: number,
        public raw_metar: string,
        public raw_taf: string) {
    }


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POINT;
    }


    public getGeometry(): Position2d {
        return undefined; // TODO
    }
}


export class MetarTafOlFeature extends MapItemOlFeature {
    public mapItemModel: MetarTaf;


    public constructor(metarTaf: MetarTaf) {
        super(metarTaf);
    }


    protected createOlStyle(): ol.style.Style {
        const src = environment.iconBaseUrl;

        return undefined; // TODO
    }
}
