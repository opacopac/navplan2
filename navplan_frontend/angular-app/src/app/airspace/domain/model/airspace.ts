import {Polygon} from '../../../geo-physics/domain/model/geometry/polygon';
import {DataItem, DataItemType} from '../../../common/domain/model/data-item';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {Clonable} from '../../../system/domain/model/clonable';


export class Airspace extends DataItem implements Clonable<Airspace> {
    constructor(
        public id: number,
        public category: string,
        public country: string,
        public name: string,
        public alt_bottom: Altitude,
        public alt_top: Altitude,
        public polygon: Polygon
    ) {
        super();
    }


    public get dataItemType(): DataItemType {
        return DataItemType.airspace;
    }


    clone(): Airspace {
        return new Airspace(
            this.id,
            this.category,
            this.country,
            this.name,
            this.alt_bottom,
            this.alt_top,
            this.polygon
        );
    }
}
