import {WwValue} from '../../domain/model/ww-value';


export class RestWwConverter {
    public static fromRestList(restWwList: number[]): WwValue[] {
        return restWwList.map(restWw => RestWwConverter.fromRest(restWw));
    }


    public static fromRest(wwValue: number): WwValue {
        if (wwValue == null) {
            return undefined;
        }

        return new WwValue(wwValue);
    }
}
