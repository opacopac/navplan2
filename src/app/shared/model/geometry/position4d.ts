import {Timestamp} from '../quantities/timestamp';
import {Position3d} from './position3d';
import {Clonable} from '../clonable';
import {Altitude} from './altitude';


export class Position4d extends Position3d implements Clonable<Position4d> {
    public constructor(
        longitude: number,
        latitude: number,
        altitude: Altitude,
        public timestamp: Timestamp) {

        super(longitude, latitude, altitude);
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
