import {IRestFlightroute} from '../../flightroute/rest-model/i-rest-flightroute';
import {IRestFuelCalc} from '../../flightroute/rest-model/i-rest-fuel-calc';


export interface IRestExportExcelRequest {
    action: string;
    flightroute: IRestFlightroute;
    fuelcalc: IRestFuelCalc;
}
