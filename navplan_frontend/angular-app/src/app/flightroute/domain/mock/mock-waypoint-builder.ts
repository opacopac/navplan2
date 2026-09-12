import {Waypoint} from "../model/waypoint";
import {WaypointType} from "../model/waypoint-type";
import {Position2d} from "../../../geo-physics/domain/model/geometry/position2d";
import {WaypointAltitude} from "../model/waypoint-altitude";
import {Altitude} from "../../../geo-physics/domain/model/geometry/altitude";
import {AltitudeReference} from "../../../geo-physics/domain/model/geometry/altitude-reference";
import {AltitudeUnit} from "../../../geo-physics/domain/model/geometry/altitude-unit";
import {Time} from "../../../geo-physics/domain/model/quantities/time";
import {TimeUnit} from "../../../geo-physics/domain/model/quantities/time-unit";


export class MockWaypointBuilder {
    private type: WaypointType = WaypointType.coordinates;
    private freq = '';
    private callsign = '';
    private checkpoint = '';
    private remark = '';
    private supp_info = '';
    private position = new Position2d(0, 0);
    private wpAlt?: WaypointAltitude = undefined;
    private vacTime = new Time(0, TimeUnit.S);


    public static aWp(callsign: string = ''): MockWaypointBuilder {
        return new MockWaypointBuilder().withCallsign(callsign);
    }


    public static anAdWp(callsign: string = ''): MockWaypointBuilder {
        return new MockWaypointBuilder()
            .withType(WaypointType.airport)
            .withCallsign(callsign);
    }


    public withType(type: WaypointType): MockWaypointBuilder {
        this.type = type;
        return this;
    }


    public withFreq(freq: string): MockWaypointBuilder {
        this.freq = freq;
        return this;
    }


    public withCallsign(callsign: string): MockWaypointBuilder {
        this.callsign = callsign;
        return this;
    }


    public withCheckpoint(checkpoint: string): MockWaypointBuilder {
        this.checkpoint = checkpoint;
        return this;
    }


    public withRemark(remark: string): MockWaypointBuilder {
        this.remark = remark;
        return this;
    }


    public withSuppInfo(supp_info: string): MockWaypointBuilder {
        this.supp_info = supp_info;
        return this;
    }


    public withPosition(position: Position2d): MockWaypointBuilder {
        this.position = position;
        return this;
    }


    public withWpAlt(wpAlt: WaypointAltitude): MockWaypointBuilder {
        this.wpAlt = wpAlt;
        return this;
    }


    public withAlt(altFtAmls: number, isMinAlt: boolean = false, isMaxAlt: boolean = false, isLegStart: boolean = false): MockWaypointBuilder {
        const wpAlt = new WaypointAltitude(new Altitude(altFtAmls, AltitudeUnit.FT, AltitudeReference.MSL), isMinAlt, isMaxAlt, isLegStart);
        return this.withWpAlt(wpAlt);
    }


    public withVacTime(vacTime: Time): MockWaypointBuilder {
        this.vacTime = vacTime;
        return this;
    }


    public withVacMin(vacMin: number): MockWaypointBuilder {
        this.vacTime = new Time(vacMin, TimeUnit.M);
        return this;
    }


    public build(): Waypoint {
        const wp = new Waypoint(
            this.type,
            this.freq,
            this.callsign,
            this.checkpoint,
            this.remark,
            this.supp_info,
            this.position,
            this.wpAlt
        );

        wp.vacTime = this.vacTime;
        return wp;
    }
}
