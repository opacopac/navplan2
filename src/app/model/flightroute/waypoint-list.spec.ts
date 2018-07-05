import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import {Waypoint2} from './waypoint2';
import {WaypointList} from './waypoint-list';
import {Speed} from '../quantities/speed';
import {SpeedUnit} from '../../core/services/utils/unitconversion.service';
import {Waypointtype} from '../waypoint';
import {Position2d} from '../geometry/position2d';
import {RxService} from '../../core/services/utils/rx.service';
import {Observable} from 'rxjs/Observable';


describe('WaypointList', () => {
    let wpList: WaypointList;
    let wp1, wp2, wp3, wp4, wp5: Waypoint2;
    let initPos1, initPos2, initPos3, initPos4, initPos5: Position2d;
    let initSpeed: Speed;


    beforeEach(() => {
        initSpeed = new Speed(60, SpeedUnit.KT);
        initPos1 = new Position2d(0, 0);
        initPos2 = new Position2d(1, 0);
        initPos3 = new Position2d(2, 0);
        initPos4 = new Position2d(3, 0);
        initPos5 = new Position2d(4, 0);
        wp1 = new Waypoint2(Waypointtype.airport, '', '', '', '', '', initPos1);
        wp2 = new Waypoint2(Waypointtype.navaid, '', '', '', '', '', initPos2);
        wp3 = new Waypoint2(Waypointtype.geoname, '', '', '', '', '', initPos3);
        wp4 = new Waypoint2(Waypointtype.airport, '', '', '', '', '', initPos4);
        wp5 = new Waypoint2(Waypointtype.airport, '', '', '', '', '', initPos5);
        wpList = new WaypointList([wp1, wp2, wp3, wp4], RxService.getEternal<Speed>(initSpeed));
    });


    it('creates an instance', () => {
        expect(wpList).toBeTruthy();
    });


    // region list manipulations

    xit('correctly replaces the waypoint list', () => {
    });


    xit('correctly clears the list', () => {
    });


    xit('correctly pushes a waypoint to the end of the list', () => {
    });


    xit('correctly inserts a waypoint into the list', () => {
    });


    xit('correctly removes a waypoint from the list', () => {
    });


    xit('correctly replaces a waypoint in the list', () => {
    });

    // endregion


    // region waypoints

    it('contains the initially created waypoints', () => {
        wpList.items$.subscribe((items) => {
            expect(items.length).toBe(4);
            expect(items[0]).toBe(wp1);
            expect(items[1]).toBe(wp2);
            expect(items[2]).toBe(wp3);
            expect(items[3]).toBe(wp4);
        });
    });


    it('correctly sets the waypoint speeds', () => {
        Observable.combineLatest(
            wpList.items$.switchMap(items => items[0].speed$),
            wpList.items$.switchMap(items => items[1].speed$),
            wpList.items$.switchMap(items => items[2].speed$),
            wpList.items$.switchMap(items => items[3].speed$)
        )
            .subscribe(([speed1, speed2, speed3, speed4]) => {
                expect(speed1).toBe(initSpeed);
                expect(speed2).toBe(initSpeed);
                expect(speed3).toBe(initSpeed);
                expect(speed4).toBe(initSpeed);
            });
    });

    // endregion


    // region alternate

    it('can set the alternate', () => {
        wpList.alternate = wp5;
        wpList.alternate$.subscribe((alternate) => {
            expect(alternate).toBe(wp5);
        });
    });


    it('can remove the alternate', () => {
        wpList.alternate = wp5;
        wpList.alternate = undefined;
        wpList.alternate$.subscribe((alternate) => {
            expect(alternate).toBeUndefined();
        });
    });


    it('correctly sets the alternate speed', () => {
        wpList.alternate = wp5;
        wpList.alternate$.switchMap(alt => alt.speed$)
            .subscribe((altSpeed) => {
                expect(altSpeed).toBe(initSpeed);
            });
    });

    // endregion


    // region wp dependencies

    it('correctly sets the waypoint dependencies (wp1 prev)', () => {
        wpList.items$.switchMap(items => items[0].previousWaypoint$)
            .subscribe((wp1prev) => {
                expect(wp1prev).toBeUndefined();
            });
    });


    it('correctly sets the waypoint dependencies (wp1 next)', () => {
        wpList.items$.switchMap(items => items[0].nextWaypoint$)
            .subscribe((wp1next) => {
                expect(wp1next).toBe(wp2);
            });
    });


    it('correctly sets the waypoint dependencies (wp4 prev)', () => {
        wpList.items$.switchMap(items => items[3].previousWaypoint$)
            .subscribe((wp4prev) => {
                expect(wp4prev).toBe(wp3);
            });
    });


    it('correctly sets the waypoint dependencies (wp4 next)', () => {
        wpList.items$.switchMap(items => items[3].nextWaypoint$)
            .subscribe((wp4next) => {
                expect(wp4next).toBeUndefined();
            });
    });


    it('correctly sets the alternate dependencies (wp4 next)', () => {
        wpList.alternate = wp5;
        wpList.items$.switchMap(items => items[3].nextWaypoint$)
            .subscribe((wp4next) => {
                expect(wp4next).toBe(wp5);
            });
    });


    it('correctly sets the alternate dependencies (alt prev)', () => {
        wpList.alternate = wp5;
        wpList.alternate$.switchMap(alternate => alternate.previousWaypoint$)
            .subscribe((altPrev) => {
                expect(altPrev).toBe(wp4);
            });
    });

    // endregion


    // region position list

    it('correctly exposes the wp position list', () => {
        wpList.positionList$.subscribe((posList) => {
            expect(posList.length).toBe(4);
            expect(posList[0]).toBe(initPos1);
            expect(posList[1]).toBe(initPos2);
            expect(posList[2]).toBe(initPos3);
            expect(posList[3]).toBe(initPos4);
        });
    });

    // endregion


    // region eet

    it('correctly exposes the wp eet list', () => {
        wpList.eetList$.subscribe((eetList) => {
            expect(eetList.length).toBe(4);
            expect(eetList[0]).toBeUndefined();
            expect(eetList[1].min).toBeCloseTo(65, 0);
            expect(eetList[2].min).toBeCloseTo(60, 0);
            expect(eetList[3].min).toBeCloseTo(65, 0);
        });
    });


    it('correctly calculates the eet sum', () => {
        wpList.eetSum$.subscribe((eetSum) => {
            expect(eetSum.min).toBeCloseTo(65 + 60 + 65, 0);
        });
    });

    // endregion
});
