import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {Icon, Style} from 'ol/style';
import {CrosshairIcon} from '../../domain/model/crosshair-icon';


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
        return new Style({
            image: new Icon(({
                opacity: 1,
                color: color,
                scale: 0.15,
                src: 'data:image/svg+xml;utf8,' + this.getCrosshairSvg(color)
            }))
        });
    }


    private static getCrosshairSvg(color: string): string {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="${color}" d="M256 0c17.7 0 32 14.3 32 32l0 10.4c93.7 13.9 167.7 88 181.6 181.6l10.4 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-10.4 0c-13.9 93.7-88 167.7-181.6 181.6l0 10.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-10.4C130.3 455.7 56.3 381.7 42.4 288L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l10.4 0C56.3 130.3 130.3 56.3 224 42.4L224 32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6l0-20.6c0-17.7 14.3-32 32-32s32 14.3 32 32l0 20.6c58.3-12.5 104.1-58.4 116.6-116.6L384 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l20.6 0C392.1 165.7 346.3 119.9 288 107.4l0 20.6c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-20.6C165.7 119.9 119.9 165.7 107.4 224l20.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-20.6 0zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`;
    }
}
