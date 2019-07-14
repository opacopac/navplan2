import { Webcam } from '../domain/webcam';
import {IRestWebcam} from './i-rest-webcam';
import {RestPosition2d} from '../../geo-math/rest/rest-position2d';


export class RestMapperWebcam {
    public static fromRest(restItem: IRestWebcam): Webcam {
        return new Webcam(
            restItem.id,
            restItem.name,
            restItem.url,
            restItem.pos ? RestPosition2d.fromRest(restItem.pos) : undefined
        );
    }
}
