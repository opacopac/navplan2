import {WnbEnvelopeCoordinate} from '../../domain/model/wnb-envelope-coordinate';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';


export class WnbEnvelopeContourSvg {
    public static create(coordinates: WnbEnvelopeCoordinate[], imgDim: WnbImageDimensionsSvg): SVGPolygonElement {
        const points: [number, number][] = [];

        coordinates.forEach(coord => {
            const point = imgDim.calcXy(coord.armCg, coord.weight);
            points.push(point);
        });

        const lastPoint = imgDim.calcXy(coordinates[0].armCg, coordinates[0].weight);
        points.push(lastPoint);

        return SvgPolygonElement.create(
            points,
            'fill:none; stroke:#455a64; stroke-width:2px'
        );
    }
}
