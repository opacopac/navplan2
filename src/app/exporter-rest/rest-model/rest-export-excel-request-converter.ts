import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {RestFlightrouteConverter} from '../../flightroute/rest-model/rest-flightroute-converter';
import {RestFuelCalcConverter} from '../../flightroute/rest-model/rest-fuel-calc-converter';
import {IRestExportExcelRequest} from './i-rest-export-excel-request';


export class RestExportExcelRequestConverter {
    public static toRest(flightroute: Flightroute): IRestExportExcelRequest {
        return {
            action: 'exportexcel',
            flightroute: RestFlightrouteConverter.toRest(flightroute),
            fuelcalc: RestFuelCalcConverter.toRest(flightroute),
        };
    }
}
