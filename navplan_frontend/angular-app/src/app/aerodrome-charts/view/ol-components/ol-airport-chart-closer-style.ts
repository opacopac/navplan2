import {Icon, Style} from 'ol/style';
import {environment} from '../../../../environments/environment';


export class OlAirportChartCloserStyle {
    public static STYLE = new Style({
        image: new Icon(({
            scale: 1,
            opacity: 0.90,
            src: environment.iconBaseUrl + 'closerbutton.png'
        }))
    });
}
