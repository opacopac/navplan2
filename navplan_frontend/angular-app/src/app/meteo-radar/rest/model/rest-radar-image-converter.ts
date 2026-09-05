import {RestDatetimeConverter} from '../../../geo-physics/rest/model/rest-datetime-converter';
import {IRestRadarImage} from './i-rest-radar-image';
import {RadarImage} from '../../domain/model/radar-image';


export class RestRadarImageConverter {
    public static fromRestList(restRadarImages: IRestRadarImage[]): RadarImage[] {
        return restRadarImages
            .map(restRadarImage => this.fromRest(restRadarImage));
    }


    public static fromRest(restRadarImage: IRestRadarImage): RadarImage {
        return new RadarImage(
            RestDatetimeConverter.fromRest(restRadarImage.starttime),
            RestDatetimeConverter.fromRest(restRadarImage.endtime)
        );
    }


    public static toRest(radarImage: RadarImage): IRestRadarImage {
        if (!radarImage) {
            return null;
        }

        return {
            starttime: RestDatetimeConverter.toRest(radarImage.startTime),
            endtime: RestDatetimeConverter.toRest(radarImage.endTime)
        };
    }
}
