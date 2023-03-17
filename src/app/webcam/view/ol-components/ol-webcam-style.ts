import {Icon, Style} from 'ol/style';
import {environment} from '../../../../environments/environment';


export class OlWebcamStyle {
    public static readonly STYLE = new Style({
        image: new Icon(({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            scale: 1,
            opacity: 0.9,
            src: environment.iconBaseUrl + 'webcam.svg'
        }))
    });
}
