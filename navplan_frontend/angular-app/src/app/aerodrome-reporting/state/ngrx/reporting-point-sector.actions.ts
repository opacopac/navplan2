import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ReportingPoint} from '../../domain/model/reporting-point';
import {ReportingSector} from '../../domain/model/reporting-sector';
import {ReportingPointsAndSectors} from '../../domain/model/reporting-points-and-sectors';


export class ReportingPointSectorActions {
    public static readonly readSuccess = createAction(
        '[ReportingPointSectorEffects] Read reporting points/sectors success',
        props<{
            extent: Extent2d,
            zoom: number,
            reportingPoints: ReportingPoint[],
            reportingSectors: ReportingSector[]
        }>()
    );


    public static readonly readByAirportIcao = createAction(
        '[ReportingPointSectorEffects] Read reporting points/sectors by airport ICAO',
        props<{ airportIcao: string }>()
    );


    public static readonly readByAirportIcaoSuccess = createAction(
        '[ReportingPointSectorEffects] Read reporting points/sectors by airport ICAO success',
        props<{ reportingPointsAndSectors: ReportingPointsAndSectors }>()
    );
}
