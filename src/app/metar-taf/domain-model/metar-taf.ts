import {DataItem, DataItemType} from '../../common/model/data-item';
import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';


export class MetarTaf extends DataItem {
    constructor(
        public ad_icao: string,
        public siteName: string,
        public metar_obs_timestamp: number,
        public taf_obs_timestamp: number,
        public cloud_cover: string,
        public wx_cond: string,
        public wind_dir_deg: number,
        public wind_speed_kt: number,
        public raw_metar: string,
        public raw_taf: string,
        public position: Position2d,
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.metarTaf;
    }


    getPosition(): Position2d {
        return this.position;
    }
}
