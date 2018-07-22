import {DataItem, DataItemType} from '../../shared/model/data-item';
import { Position2d } from '../../shared/model/geometry/position2d';


export class Geoname extends DataItem {
    constructor(
        public id: string,
        public name: string,
        public searchresultname: string,
        public feature_class: string,
        public feature_code: string,
        public country: string,
        public admin1: string,
        public admin2: string,
        public population: number,
        public position: Position2d,
        public elevation_m: number) {

        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.geoname;
    }
}
