import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';


export class SwisstopoImageBaselayer {
    static createBaseLayer(attributions: string[]): TileLayer<XYZ> {
        return new TileLayer({
            source: new XYZ({
                url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',
                attributions: attributions
            })
        });
    }
}
