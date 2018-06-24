import {Altitude} from '../quantities/altitude';
import {Position2d} from './position2d';

export class Position3d extends Position2d {
    public altitude: Altitude;


    public constructor(lon: number, lat: number, altitude: Altitude) {
        super(lon, lat);
        this.altitude = altitude;
    }


    public hasAltitude(): boolean {
        return this.altitude != null;
    }
}
