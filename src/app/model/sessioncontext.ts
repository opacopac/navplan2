import { User } from './user';
import { Position2d } from './position';
import { Flightroute } from './flightroute';
import { MapbaselayerType } from './ol-model/mapbaselayer-factory';
import { Track } from './track';
import { Waypoint } from "./waypoint";


export class Sessioncontext {
    public sessionId: number;
    public user: User;
    public settings: Globalsettings;
    public map: Mapsettings;
    public flightroute: Flightroute;
    public track: Track;
    public selectedWaypoint: Waypoint;
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
