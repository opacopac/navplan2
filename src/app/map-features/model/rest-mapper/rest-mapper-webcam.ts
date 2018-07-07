import { Position2d } from '../../../shared/model/geometry/position2d';
import { Webcam } from '../../model/webcam';


export interface WebcamRestItem {
    id: number;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
}


export class RestMapperWebcam {
    public static getWebcamFromRestItem(restItem: WebcamRestItem): Webcam {
        return new Webcam(
            restItem.id,
            restItem.name,
            restItem.url,
            new Position2d(restItem.longitude, restItem.latitude));
    }
}
