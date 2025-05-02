import {createAction, props} from '@ngrx/store';
import {AirportChart} from '../../domain/model/airport-chart';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';
import {ChartUploadParameters} from '../../domain/model/chart-upload-parameters';
import {XyCoord} from '../../../geo-physics/domain/model/geometry/xyCoord';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {AirportChartEffects} from './airport-chart.effects';
import {ChartSaveParameters} from '../../domain/model/chart-save-parameters';


export class AirportChartActions {
    public static readonly openAirportChart = createAction(
        '[Airport Overlay] Open airport chart',
        props<{ chartId: number }>()
    );

    public static readonly showAirportChart = createAction(
        '[AirportChartEffects] Show airport chart',
        props<{ chart: AirportChart }>()
    );

    public static readonly closeAirportChart = createAction(
        '[AirportChartCloser] Close airport chart',
        props<{ chartId: number }>()
    );

    public static readonly closeAllAirportCharts = createAction(
        '[Clear Dialog] Close all airport charts'
    );

    public static readonly chartFileSelected = createAction(
        '[Chart Upload Dialog] Chart file selected',
        props<{ file: File }>()
    );

    public static readonly uploadAirportChart = createAction(
        '[Chart Upload Dialog] Upload airport chart',
        props<{ chartUploadParameters: ChartUploadParameters }>()
    );

    public static readonly uploadAirportChartSuccess = createAction(
        '[AirportChartEffects] Upload airport chart success',
        props<{ chartInfo: UploadedChartInfo }>()
    );

    public static readonly uploadAirportChartError = createAction(
        '[AirportChartEffects] Upload airport chart error',
        props<{ error: Error }>()
    );

    public static readonly chartReference1Changed = createAction(
        '[Chart Upload Dialog] Chart reference 1 changed',
        props<{ chartReference1: XyCoord }>()
    );

    public static readonly chartReference2Changed = createAction(
        '[Chart Upload Dialog] Chart reference 2 changed',
        props<{ chartReference2: XyCoord }>()
    );

    public static readonly mapReference1Changed = createAction(
        '[Chart Upload Dialog] Map reference 1 changed',
        props<{ mapReference1: Position2d }>()
    );

    public static readonly mapReference2Changed = createAction(
        '[Chart Upload Dialog] Map reference 2 changed',
        props<{ mapReference2: Position2d }>()
    );

    public static readonly cancelUploadAirportChart = createAction(
        '[Chart Upload Dialog] Close upload airport chart dialog'
    );

    public static readonly saveAirportChart = createAction(
        '[Chart Upload Dialog] Save airport chart'
    );

    public static readonly saveAirportChartSuccess = createAction(
        '[AirportChartEffects] Save airport chart success',
        props<{ chart: AirportChart }>()
    );

    public static readonly saveAirportChartError = createAction(
        '[AirportChartEffects] Save airport chart error',
        props<{ error: Error }>()
    );
}
