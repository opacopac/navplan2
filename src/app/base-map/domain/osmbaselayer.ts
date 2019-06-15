import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';


export class Osmbaselayer {
    static createBaseLayer(attributions: string[]): TileLayer {
        const layer = new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attributions: attributions
            })
        });

        return layer;
    }
}
