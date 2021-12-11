import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {IRestExportPdfRequest} from './i-rest-export-pdf-request';
import {RestFlightrouteConverter} from '../../flightroute-rest/rest-model/rest-flightroute-converter';
import {RestFuelCalcConverter} from '../../flightroute-rest/rest-model/rest-fuel-calc-converter';


export class RestExportPdfRequestConverter {
    public static toRest(flightroute: Flightroute): IRestExportPdfRequest {
        return {
            action: 'exportpdf',
            flightroute: RestFlightrouteConverter.toRest(flightroute),
            fuelcalc: RestFuelCalcConverter.toRest(flightroute),
        };
    }
}
