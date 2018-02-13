import { Position2d } from './position';
import { DataItem } from './data-item';


export class MetarTafList {
    public items: MetarTaf[] = [];
}


export class MetarTaf extends DataItem {
    public position: Position2d;

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

        super();
    }
}
