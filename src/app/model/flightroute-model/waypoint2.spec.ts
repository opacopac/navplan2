import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import {Waypoint2} from './waypoint2';
import {Waypointtype} from '../waypoint';
import {Position2d} from '../position';
import {WaypointAltitude2} from './waypoint-altitude2';
import {LengthUnit, SpeedUnit} from '../../services/utils/unitconversion.service';
import {Speed} from '../units/speed';
import {Observable} from 'rxjs/Observable';


describe('Waypoint', () => {
    let waypoint, waypoint2, waypoint3: Waypoint2;
    let initType: Waypointtype;
    let initFreq: string;
    let initCallsign: string;
    let initCheckpoint: string;
    let initRemark: string;
    let initSuppInfo: string;
    let initPosition, initPos2, initPos3: Position2d;
    let initAltitude: WaypointAltitude2;


    beforeEach(() => {
        initType = Waypointtype.airport;
        initFreq = '121.025';
        initCallsign = 'TWR';
        initCheckpoint = 'LSZB';
        initRemark = 'nix';
        initSuppInfo = 'wieder nix';
        initPosition = new Position2d(7.5, 47.5);
        initAltitude = new WaypointAltitude2(1675, true, false, true);
        waypoint = new Waypoint2(
            initType,
            initFreq,
            initCallsign,
            initCheckpoint,
            initRemark,
            initSuppInfo,
            initPosition,
            initAltitude);

        initPos2 = new Position2d(8.0, 48);
        waypoint2 = new Waypoint2(Waypointtype.airport, '', '', '', '', '', initPos2);
        initPos3 = new Position2d(9.0, 49);
        waypoint3 = new Waypoint2(Waypointtype.airport, '', '', '', '', '', initPos3);
    });


    it('creates an instance', () => {
        expect(waypoint).toBeTruthy();
    });


    // region position

    it('contains the correct initial position', () => {
        waypoint.position$
            .subscribe((pos) => {
                expect(pos).toBe(initPosition);
            });
    });


    it('can update the position', () => {
        const newPos = new Position2d(7.6, 47.6);
        waypoint.position = newPos;
        waypoint.position$
            .subscribe((pos) => {
                expect(pos).toBe(newPos);
            });
    });

    // endregion


    // region isOriginAirport

    it('calculates the isOriginAirport flag correctly (single wp, airport)', () => {
        waypoint.type = Waypointtype.airport;
        waypoint.isOriginAirport$
            .subscribe((isOriginAirport) => {
                expect(isOriginAirport).toBeTruthy();
            });
    });


    it('calculates the isOriginAirport flag correctly (single wp, non-airport)', () => {
        waypoint.type = Waypointtype.navaid;
        waypoint.isOriginAirport$
            .subscribe((isOriginAirport) => {
                expect(isOriginAirport).toBeFalsy();
            });
    });


    it('calculates the isOriginAirport flag correctly (second wp)', () => {
        waypoint.type = Waypointtype.airport;
        waypoint.previousWaypoint = waypoint2;
        waypoint.isOriginAirport$
            .subscribe((isOriginAirport) => {
                expect(isOriginAirport).toBeFalsy();
            });
    });

    // endregion


    // region isDestinationAirport

    it('calculates the isDestinationAirport flag correctly (single wp, airport)', () => {
        waypoint.type = Waypointtype.airport;
        waypoint.isDestinationAirport$
            .subscribe((isDestAirport) => {
                expect(isDestAirport).toBeTruthy();
            });
    });


    it('calculates the isDestinationAirport flag correctly (single wp, non-airport)', () => {
        waypoint.type = Waypointtype.navaid;
        waypoint.isDestinationAirport$
            .subscribe((isDestAirport) => {
                expect(isDestAirport).toBeFalsy();
            });
    });


    it('calculates the isDestinationAirport flag correctly (airport & next wp is not alternate)', () => {
        waypoint2.isaltatlegstart = false;
        waypoint.type = Waypointtype.airport;
        waypoint.nextWaypoint = waypoint2;
        waypoint.isDestinationAirport$
            .subscribe((isDestAirport) => {
                expect(isDestAirport).toBeFalsy();
            });
    });


    it('calculates the isDestinationAirport flag correctly (airport & next wp is alternate)', () => {
        waypoint2.isaltatlegstart = true;
        waypoint.type = Waypointtype.airport;
        waypoint.nextWaypoint = waypoint2;
        waypoint.isDestinationAirport$
            .subscribe((isDestAirport) => {
                expect(isDestAirport).toBeFalsy();
            });
    });

    // endregion


    // region speed

    it('contains no initial speed or speed observable', () => {
        waypoint.speed$
            .subscribe((speed) => {
                expect(speed).toBeUndefined();
            });
        waypoint.speedObservable$
            .subscribe((speedObs) => {
                expect(speedObs).toBeUndefined();
            });
    });


    it('can update the speed observable', () => {
        const newSpeed = new Speed(100, SpeedUnit.KT);
        waypoint.speedObservable = Observable.of(newSpeed);
        waypoint.speed$
            .subscribe((speed) => {
                expect(speed).toBe(newSpeed);
            });
    });

    // endregion


    // region mt

    it('contains the correct initial mt', () => {
        waypoint.mt$
            .subscribe((mt) => {
                expect(mt).toBeUndefined();
            });
    });


    it('calculates the correct mt', () => {
        waypoint.previousWaypoint = waypoint2;
        waypoint2.position = new Position2d(0.0, 0.0); // prev pos
        waypoint.position = new Position2d(1.0, 0.0); // next pos
        waypoint.mt$
            .subscribe((mt) => {
                expect(mt.deg).toBe(90);
            });
    });


    it('calculates the correct mt text for non-airports', () => {
        waypoint2.type = Waypointtype.navaid;
        waypoint2.position = new Position2d(0.0, 0.0); // prev pos
        waypoint.type = Waypointtype.navaid;
        waypoint.position = new Position2d(1.0, 0.0); // current pos
        waypoint.previousWaypoint = waypoint2;
        waypoint.mtText$
            .subscribe((mtText) => {
                expect(mtText).toBe('090');
            });
    });


    it('calculates the correct mt text for the first leg', () => {
        waypoint2.type = Waypointtype.airport;
        waypoint2.position = new Position2d(0.0, 0.0); // prev pos
        waypoint3.type = Waypointtype.navaid;
        waypoint3.position = new Position2d(2.0, 0.0); // next pos
        waypoint.type = Waypointtype.geoname;
        waypoint.position = new Position2d(1.0, 0.0); // current pos
        waypoint.previousWaypoint = waypoint2;
        waypoint.nextWaypoint = waypoint3;
        waypoint2.mtText$
            .subscribe((mtText) => {
                expect(mtText).toBe('');
            });
        waypoint.mtText$
            .subscribe((mtText) => {
                expect(mtText).toBe('VAC');
            });
        waypoint3.mtText$
            .subscribe((mtText) => {
                expect(mtText).toBe('090');
            });

    });


    it('calculates the correct mt text for destination-airports', () => {
        waypoint.type = Waypointtype.airport;
        waypoint.previousWaypoint = waypoint2;
        waypoint.mtText$
            .subscribe((mtText) => {
                expect(mtText).toBe('VAC');
            });
    });


    it('calculates the correct mt text for alternate-airports', () => {
        waypoint2.type = Waypointtype.navaid;
        waypoint2.position = new Position2d(0.0, 0.0); // prev pos
        waypoint.type = Waypointtype.airport;
        waypoint.position = new Position2d(0.0, 1.0); // current pos
        waypoint.previousWaypoint = waypoint2;
        waypoint.isAlternate = true;
        waypoint.nextWaypoint = waypoint2;
        waypoint.mtText$
            .subscribe((mtText) => {
                expect(mtText).toBe('000');
            });
    });

    // endregion


    // region distance

    it('has no initial distance', () => {
        waypoint.dist$
            .subscribe((dist) => {
                expect(dist).toBeUndefined();
            });
    });


    it('calculates the correct distance to the next waypoint', () => {
        waypoint.position = new Position2d(0, 1);
        waypoint2.position = new Position2d(0, 0);
        waypoint.previousWaypoint = waypoint2;
        waypoint.dist$
            .subscribe((dist) => {
                expect(dist.getValue(LengthUnit.NM)).toBeCloseTo(60, 0);
            });
    });


    it('has no initial distance text', () => {
        waypoint.distText$
            .subscribe((distText) => {
                expect(distText).toBe('');
            });
    });


    it('calculates the correct distance text to the next waypoint', () => {
        waypoint.position = new Position2d(0, 1);
        waypoint2.position = new Position2d(0, 0);
        waypoint.previousWaypoint = waypoint2;
        waypoint.distText$
            .subscribe((distText) => {
                expect(distText).toBe('61');
            });
    });

    // endregion


    // region vactime

    it('calculates the correct vactime for the first wp (without next wp)', () => {
        waypoint.vacTime$
            .subscribe((vacTime) => {
                expect(vacTime.min).toBe(0);
            });
    });


    it('calculates the correct vactime for the first wp (with next wp)', () => {
        waypoint.nextWaypoint = waypoint2;
        waypoint.vacTime$
            .subscribe((vacTime) => {
                expect(vacTime.min).toBe(0);
            });
    });


    it('calculates the correct vactime for the wp after the origin airport', () => {
        waypoint2.type = Waypointtype.airport;
        waypoint.type = Waypointtype.navaid;
        waypoint.previousWaypoint = waypoint2;
        waypoint.vacTime$
            .subscribe((vacTime) => {
                expect(vacTime.min).toBe(5);
            });
    });


    it('calculates the correct vactime for the destination airport', () => {
        waypoint2.type = Waypointtype.navaid;
        waypoint.type = Waypointtype.airport;
        waypoint.previousWaypoint = waypoint2;
        waypoint.vacTime$
            .subscribe((vacTime) => {
                expect(vacTime.min).toBe(5);
            });
    });


    it('calculates the correct vactime for alternate airport (without previous wp)', () => {
        waypoint.type = Waypointtype.airport;
        waypoint.isAlternate = true;
        waypoint.vacTime$
            .subscribe((vacTime) => {
                expect(vacTime.min).toBe(0);
            });
    });

    it('calculates the correct vactime for alternate airport (with previous wp)', () => {
        waypoint.type = Waypointtype.airport;
        waypoint.previousWaypoint = waypoint2;
        waypoint.isAlternate = true;
        waypoint.vacTime$
            .subscribe((vacTime) => {
                expect(vacTime.min).toBe(5);
            });
    });

    // endregion


    // region eet

    it('contains no initial eet', () => {
        waypoint.eet$
            .subscribe((legTime) => {
                expect(legTime).toBeUndefined();
            });
    });


    it('calculates the correct eet to the next waypoint (without vac time)', () => {
        const initSpeed = new Speed(60, SpeedUnit.KT);
        waypoint2.type = Waypointtype.navaid;
        waypoint2.position = new Position2d(0, 0); // prev pos
        waypoint.type = Waypointtype.navaid;
        waypoint.position = new Position2d(0, 1); // current pos
        waypoint.speedObservable = Observable.of(initSpeed);
        waypoint.previousWaypoint = waypoint2;
        waypoint.eet$
            .subscribe((legTime) => {
                expect(legTime.min).toBeCloseTo(60, 0);
            });
    });


    it('calculates the correct eet to the next waypoint (with vac time)', () => {
        const initSpeed = new Speed(60, SpeedUnit.KT);
        waypoint2.position = new Position2d(0, 0); // prev pos
        waypoint.position = new Position2d(0, 1); // current pos
        waypoint.type = Waypointtype.airport;
        waypoint.speedObservable = Observable.of(initSpeed);
        waypoint.previousWaypoint = waypoint2;
        waypoint.eet$
            .subscribe((legTime) => {
                expect(legTime.min).toBeCloseTo(60 + 5, 0);
            });
    });


    it('has no initial eet text', () => {
        waypoint.eetText$
            .subscribe((eetText) => {
                expect(eetText).toBe('');
            });
    });


    it('calculates the correct eet text (without vac time)', () => {
        const initSpeed = new Speed(60, SpeedUnit.KT);
        waypoint2.type = Waypointtype.navaid;
        waypoint2.position = new Position2d(0, 0); // prev pos
        waypoint.type = Waypointtype.navaid;
        waypoint.position = new Position2d(0, 1); // current pos
        waypoint.speedObservable = Observable.of(initSpeed);
        waypoint.previousWaypoint = waypoint2;
        waypoint.eetText$
            .subscribe((eetText) => {
                expect(eetText).toBe('61');
            });

    });


    it('calculates the correct eet text (with vac time)', () => {
        const initSpeed = new Speed(60, SpeedUnit.KT);
        waypoint2.position = new Position2d(0, 0); // prev pos
        waypoint.position = new Position2d(0, 1); // current pos
        waypoint.type = Waypointtype.airport;
        waypoint.speedObservable = Observable.of(initSpeed);
        waypoint.previousWaypoint = waypoint2;
        waypoint.eetText$
            .subscribe((eetText) => {
                expect(eetText).toBe('61/+5');
            });

    });

    // endregion
});
