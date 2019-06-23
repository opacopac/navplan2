import { Webcam } from '../domain/webcam';
import {IRestWebcam} from './i-rest-webcam';
import {RestPosition2d} from '../../shared/model/rest/rest-position2d';


export class RestWebcam {
    public static fromRest(restItem: IRestWebcam): Webcam {
        return new Webcam(
            restItem.id,
            restItem.name,
            restItem.url,
            restItem.pos ? RestPosition2d.fromRest(restItem.pos) : undefined
        );
    }
}
