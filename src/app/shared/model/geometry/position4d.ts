import {Altitude} from '../quantities/altitude';
import {Timestamp} from '../quantities/timestamp';
import {Position3d} from './position3d';
import {Clonable} from '../clonable';


export class Position4d extends Position3d implements Clonable<Position4d> {
    public timestamp: Timestamp;


    public constructor(lon: number, lat: number, altitude: Altitude, timestamp: Timestamp) {
        super(lon, lat, altitude);
        this.timestamp = timestamp;
    }


    public clone(): Position4d {
        return new Position4d(
            this.longitude,
            this.latitude,
            this.altitude.clone(),
            this.timestamp.clone()
        );
    }
}
