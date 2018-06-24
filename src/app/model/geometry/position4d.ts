import {Altitude} from '../quantities/altitude';
import {Timestamp} from '../quantities/timestamp';
import {Position3d} from './position3d';


export class Position4d extends Position3d {
    public timestamp: Timestamp;


    public constructor(lon: number, lat: number, altitude: Altitude, timestamp: Timestamp) {
        super(lon, lat, altitude);
        this.timestamp = timestamp;
    }
}
