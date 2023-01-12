import {RestAltitudeConverter} from '../../../geo-physics/rest/model/rest-altitude-converter';
import {IRestVerticalCloudLevel} from './i-rest-vertical-cloud-level';
import {VerticalCloudLevel} from '../../domain/model/vertical-cloud-level';


export class RestVerticalCloudLevelConverter {
    public static fromRestList(restVerticalCloudLevels: IRestVerticalCloudLevel[]): VerticalCloudLevel[] {
        return restVerticalCloudLevels.map(restVerticalCloudLevel => this.fromRest(restVerticalCloudLevel));
    }


    public static fromRest(restVerticalCloudLevel: IRestVerticalCloudLevel): VerticalCloudLevel {
        if (restVerticalCloudLevel == null) {
            return undefined;
        }

        return new VerticalCloudLevel(
            RestAltitudeConverter.fromRest(restVerticalCloudLevel[0]),
            restVerticalCloudLevel[1]
        );
    }
}
