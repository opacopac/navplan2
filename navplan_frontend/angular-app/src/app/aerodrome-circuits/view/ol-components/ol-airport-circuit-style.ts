import {Stroke, Style} from 'ol/style';


export class OlAirportCircuitStyle {
    public static readonly STYLE = new Style({
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 1)',
            width: 2
        })
    });
}
