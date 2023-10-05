import {IRestConsumption} from './i-rest-consumption';
import {Consumption} from '../../domain/model/quantities/consumption';
import {ConsumptionUnit} from '../../domain/model/quantities/consumption-unit';


export class RestConsumptionConverter {
    public static fromRest(restConsumption: IRestConsumption): Consumption {
        return new Consumption(
            restConsumption[0],
            ConsumptionUnit[restConsumption[1]],
        );
    }


    public static toRest(consumption: Consumption): IRestConsumption {
        return [
            consumption.value,
            ConsumptionUnit[consumption.unit]
        ];
    }
}
