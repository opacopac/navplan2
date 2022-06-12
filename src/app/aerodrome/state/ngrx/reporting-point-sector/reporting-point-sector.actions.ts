import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../../geo-physics/domain/model/geometry/extent2d';
import {ReportingPoint} from '../../../domain/model/reporting-point';
import {ReportingSector} from '../../../domain/model/reporting-sector';


export class ReportingPointSectorActions {
    public static readonly update = createAction(
        '[FlightMapEffects] Update reporting points/sectors',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly updateSuccess = createAction(
        '[ReportingPointSectorEffects] Update reporting points/sectors success',
        props<{ extent: Extent2d, zoom: number, reportingPoints: ReportingPoint[], reportingSectors: ReportingSector[] }>()
    );
}