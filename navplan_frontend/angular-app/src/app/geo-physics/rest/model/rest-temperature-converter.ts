import {IRestTemperature} from './i-rest-temperature';
import {Temperature} from '../../domain/model/quantities/temperature';
import {TemperatureUnit} from '../../domain/model/quantities/temperature-unit';


export class RestTemperatureConverter {
    public static fromRest(restTemp: IRestTemperature): Temperature {
        return new Temperature(
            restTemp[0],
            TemperatureUnit[restTemp[1]],
        );
    }


    public static toRest(temp: Temperature): IRestTemperature {
        return [
            temp.value,
            TemperatureUnit[temp.unit]
        ];
    }


    public static fromRestList(restTempList: IRestTemperature[]): Temperature[] {
        return restTempList.map(restTemp => RestTemperatureConverter.fromRest(restTemp));
    }


    public static toRestList(tempList: Temperature[]): IRestTemperature[] {
        return tempList.map(temp => RestTemperatureConverter.toRest(temp));
    }
}
