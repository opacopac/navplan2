import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {ReportingPoint} from '../../domain-model/reporting-point';
import {ReportingSector} from '../../domain-model/reporting-sector';


export class ReportingPointSectorActions {
    public static readonly readReportingPointsSectors = createAction(
        '[Flight Map] Read reporting points/sectors by extent',
        props<{ extent: Extent2d, zoom: number }>()
    );
    public static readonly showReportingPointsSectors = createAction(
        '[ReportingPointSectorEffects] Show reporting points/sectors on map',
        props<{ extent: Extent2d, zoom: number, reportingPoints: ReportingPoint[], reportingSectors: ReportingSector[] }>()
    );
}
