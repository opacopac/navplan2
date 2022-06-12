import {Webcam} from '../../domain/model/webcam';
import {IRestWebcam} from './i-rest-webcam';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';


export class RestWebcamConverter {
    public static fromRest(restItem: IRestWebcam): Webcam {
        return new Webcam(
            restItem.id,
            restItem.name,
            restItem.url,
            restItem.pos ? Position2dConverter.fromRest(restItem.pos) : undefined
        );
    }


    public static fromRestList(restWebcamList: IRestWebcam[]): Webcam[] {
        return restWebcamList.map(restWebcam => RestWebcamConverter.fromRest(restWebcam));
    }
}
