import {Aircraft2} from './aircraft2';
import {ConsumptionUnit, SpeedUnit} from '../../services/utils/unitconversion.service';
import {Speed} from '../units/speed';
import {Consumption} from '../units/consumption';
import {Flightroute2} from './flightroute2';
import {Waypoint2} from './waypoint2';
import {Position2d} from '../position';
import {Waypointtype} from '../waypoint';


describe('Flightroute', () => {
    let flightroute: Flightroute2;
    let initSpeed: Speed;
    let initConsumption: Consumption;
    let initAircraft: Aircraft2;
    let initPos1, initPos2, initPos3, initPos4: Position2d;
    let wp1, wp2, wp3, wp4: Waypoint2;


    beforeEach(() => {
        initSpeed = new Speed(100, SpeedUnit.KT);
        initConsumption = new Consumption(20, ConsumptionUnit.L_PER_H);
        initAircraft = new Aircraft2(initSpeed, initConsumption);
        initPos1 = new Position2d(0, 0);
        initPos2 = new Position2d(1, 0);
        initPos3 = new Position2d(2, 0);
        initPos4 = new Position2d(3, 0);
        wp1 = new Waypoint2(Waypointtype.airport, '', '', '', '', '', initPos1);
        wp2 = new Waypoint2(Waypointtype.navaid, '', '', '', '', '', initPos2);
        wp3 = new Waypoint2(Waypointtype.geoname, '', '', '', '', '', initPos3);
        wp4 = new Waypoint2(Waypointtype.airport, '', '', '', '', '', initPos4);
        flightroute = new Flightroute2();
        flightroute.aircraft = initAircraft;
        flightroute.waypointList.replaceList([wp1, wp2, wp3, wp4]);
    });


    it('creates an instance', () => {
        expect(flightroute).toBeTruthy();
    });


    it('correctly exposes the speed of the aircraft', () => {
        flightroute.speed$
            .subscribe((speed) => {
                expect(speed).toBe(initSpeed);
            });
    });
});
