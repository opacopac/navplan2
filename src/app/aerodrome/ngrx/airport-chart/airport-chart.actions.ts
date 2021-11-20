import {createAction, props} from '@ngrx/store';
import {AirportChart} from '../../domain-model/airport-chart';


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
}
