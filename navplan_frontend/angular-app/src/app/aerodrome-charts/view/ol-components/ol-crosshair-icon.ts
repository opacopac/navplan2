import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {Icon, Style} from 'ol/style';
import {CrosshairIcon} from '../../domain/model/crosshair-icon';
import {SvgCrosshairSvg} from '../../../common/svg/svg-crosshair-svg';


export class OlCrosshairIcon {
    public static draw(
        icon: CrosshairIcon,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(undefined, false);
        olFeature.setStyle(this.getStyle(icon.color));
        olFeature.setGeometry(OlGeometry.fromPoint(icon.pos));
        layer.addFeature(olFeature);
    }


    private static getStyle(color: string): Style {
        const crosshairSvg = SvgCrosshairSvg.create(color);

        return new Style({
            image: new Icon(({
                opacity: 1,
                color: color,
                scale: 1,
                src: 'data:image/svg+xml;utf8,' + crosshairSvg.outerHTML
            }))
        });
    }
}
