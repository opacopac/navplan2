import {Fill, Stroke, Style, Text} from 'ol/style';


export class OlNotamStyle {
    private static readonly FILL = new Fill({color: 'rgba(255, 0, 0, 0.15)'});
    private static readonly STROKE = new Stroke({color: 'rgba(255, 0, 0, 0.8)', width: 3});
    private static readonly TEXT_FILL = new Fill({color: 'rgba(255, 0, 0, 1.0)'});
    private static readonly TEXT_STROKE = new Stroke({color: '#FFFFFF', width: 2});


    public static createStyle(notamId: string): Style {
        return new Style({
            fill: this.FILL,
            stroke: this.STROKE,
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: notamId,
                fill: this.TEXT_FILL,
                stroke: this.TEXT_STROKE,
            })
        });
    }
}
