import {Actions} from '@ngrx/effects';
import {of} from 'rxjs';
import {OlMapMovedZoomedRotatedAction} from '../../ol-map/ngrx/ol-map.actions';
import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {Angle} from '../../geo-math/domain/quantities/angle';
import {AngleUnit} from '../../geo-math/domain/quantities/units';
import {NavMapEffects} from './nav-map.effects';
import {ReadOpenAipItemsAction} from '../../open-aip/ngrx/open-aip.actions';
import {MockStore} from '../../shared/test/mock-store';
import {NavMapState} from '../domain/nav-map-state';
import {ReadNotamAction} from '../../notam/ngrx/notam.actions';
import {ReadMetarTafAction} from '../../metar-taf/ngrx/metar-taf.actions';


describe('NavMapEffects', () => {
    let position: Position2d;
    let zoom: number;
    let rotation: Angle;
    let extent: Extent2d;
    let initialState: NavMapState;
    let store: MockStore;


    function createEffects(actions$: Actions): NavMapEffects {
        return new NavMapEffects(actions$, store);
    }


    beforeEach(() => {
        position = new Position2d(7.5, 47.5);
        zoom = 11;
        rotation = new Angle(0, AngleUnit.DEG);
        extent = new Extent2d(7.0, 47.0, 8.0, 48.0);
        initialState = { isActive: false };
        store = new MockStore('navMapState', initialState);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    it('sends a openaip, notam, metartaf read actions upon OlMapMovedZoomedRotatedAction while active', async () => {
        store.setState('navMapState', { ...initialState, isActive: true });
        const actions$ = new Actions(of(new OlMapMovedZoomedRotatedAction(position, zoom, rotation, extent)));

        const effects = createEffects(actions$);
        const actions = [];
        await effects.mapMovedZoomedRotatedAction$.subscribe(action => {
            actions.push(action);
        });

        expect(actions.length).toEqual(3);
        expect(actions[0]).toEqual(new ReadOpenAipItemsAction(extent, zoom));
        expect(actions[1]).toEqual(new ReadNotamAction(extent, zoom));
        expect(actions[2]).toEqual(new ReadMetarTafAction(extent, zoom));
    });


    it('does NOT send read actions upon OlMapMovedZoomedRotatedAction while inactive', async () => {
        store.setState('navMapState', { ...initialState, isActive: false });
        const actions$ = new Actions(of(new OlMapMovedZoomedRotatedAction(position, zoom, rotation, extent)));

        const effects = createEffects(actions$);
        const actions = [];
        await effects.mapMovedZoomedRotatedAction$.subscribe(action => {
            actions.push(action);
        });

        expect(actions.length).toEqual(0);
    });

});
