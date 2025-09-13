import {RestAltitudeConverter} from '../../../geo-physics/rest/model/rest-altitude-converter';
import {IRestVerticalWindLevel} from './i-rest-vertical-wind-level';
import {VerticalWindLevel} from '../../domain/model/vertical-wind-level';
import {RestSpeedConverter} from '../../../geo-physics/rest/model/rest-speed-converter';
import {RestAngleConverter} from '../../../geo-physics/rest/model/rest-angle-converter';


export class RestVerticalWindLevelConverter {
    public static fromRestList(restVerticalWindLevels: IRestVerticalWindLevel[]): VerticalWindLevel[] {
        return restVerticalWindLevels.map(restVerticalWindLevel => this.fromRest(restVerticalWindLevel));
    }


    public static fromRest(restVerticalWindLevel: IRestVerticalWindLevel): VerticalWindLevel {
        if (restVerticalWindLevel == null) {
            return undefined;
        }

        return new VerticalWindLevel(
            RestAltitudeConverter.fromRest(restVerticalWindLevel[0]),
            RestAngleConverter.fromRest(restVerticalWindLevel[1]),
            RestSpeedConverter.fromRest(restVerticalWindLevel[2])
        );
    }
}
