import {Fill, Stroke, Style, Text} from 'ol/style';
import {ReportingPoint} from '../../../domain/model/reporting-point';
import {OlReportingPointIcon} from './ol-reporting-point-icon';


export class OlReportingPointStyle {
    private static readonly FILL = new Fill({color: '#0077FF'});
    private static readonly STROKE = new Stroke({color: '#FFFFFF', width: 2});


    public static createPointStyle(rp: ReportingPoint): Style {
        const icon = OlReportingPointIcon.getIcon(rp.inbd_comp, rp.outbd_comp);

        return new Style({
            image: icon,
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: rp.name,
                fill: this.FILL,
                stroke: this.STROKE,
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
