import {Position2d} from './position2d';
import {Clonable} from '../../../system/domain/clonable';
import {Altitude} from './altitude';


export class Position3d extends Position2d implements Clonable<Position3d> {
    public constructor(
        longitude: number,
        latitude: number,
        public altitude: Altitude
    ) {
        super(longitude, latitude);
    }


    public hasAltitude(): boolean {
        return this.altitude != null;
    }


    public clone(): Position3d {
        return new Position3d(
            this.longitude,
            this.latitude,
            this.altitude.clone()
        );
    }
}
