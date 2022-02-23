import {Circle, Fill, Style} from 'ol/style';


export class OlTrafficTrailStyle {
    public static readonly DOT_STYLE = new Style({
        image: new Circle({
            radius: 2,
            fill: new Fill({
                color: '#FF0000'
            })
        })
    });
}
