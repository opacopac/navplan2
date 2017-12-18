import { User } from './user';
import { Position2d } from './position';
import { Flightroute } from './flightroute';
import { MapbaselayerType } from './map/mapbaselayer-factory';
import { Track } from './track';


export class Sessioncontext {
    public user: User;
    public settings: Globalsettings;
    public map: Mapsettings;
    public flightroute: Flightroute;
    public track: Track;
}


export class Globalsettings {
    variationDeg: number;
    maxTrafficAltitudeFt: number;
    baseMapType: MapbaselayerType;
}


export class Mapsettings {
    position: Position2d;
    zoom: number;
}
