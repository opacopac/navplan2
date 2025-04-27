import {createAction, props} from '@ngrx/store';
import {AirportChart} from '../../domain/model/airport-chart';
import {UploadedChartInfo} from '../../domain/model/uploaded-chart-info';
import {ChartUploadParameters} from '../../domain/model/chart-upload-parameters';


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
}
