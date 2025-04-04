import {Fill, Stroke, Style, Text} from 'ol/style';
import {ReportingSector} from '../../domain/model/reporting-sector';


export class OlReportingSectorStyle {
    private static readonly FILL = new Fill({color: 'rgba(124, 47, 215, 0.3)'});
    private static readonly STROKE = new Stroke({color: 'rgba(124, 47, 215, 0.5)', width: 2});
    private static readonly TEXT_FILL = new Fill({color: '#7C4AD7'});
    private static readonly TEXT_STROKE = new Stroke({color: '#FFFFFF', width: 2});


    public static createPolygonStyle(reportingSector: ReportingSector): Style {
        return new Style({
            fill: this.FILL,
            stroke: this.STROKE,
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: reportingSector.name,
                fill: this.TEXT_FILL,
                stroke: this.TEXT_STROKE,
            })
        });
    }
}
