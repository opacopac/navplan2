import {Altitude} from '../quantities/altitude';
import {Position2d} from './position2d';
import {Clonable} from '../clonable';

export class Position3d extends Position2d implements Clonable<Position3d> {
    public altitude: Altitude;


    public constructor(lon: number, lat: number, altitude: Altitude) {
        super(lon, lat);
        this.altitude = altitude;
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
