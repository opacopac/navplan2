import {WnbEnvelopeCoordinate} from '../../domain/model/wnb-envelope-coordinate';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {SvgPolygonBuilder} from '../../../common/svg/svg-polygon-builder';


export class WnbEnvelopeContourSvg {
    public static create(coordinates: WnbEnvelopeCoordinate[], imgDim: WnbImageDimensionsSvg): SVGPolygonElement {
        const polygon = SvgPolygonBuilder.builder();

        coordinates.forEach(coord => {
            polygon.addPoint(imgDim.calcXy(coord.armCg, coord.weight));
        });

        polygon.addPoint(imgDim.calcXy(coordinates[0].armCg, coordinates[0].weight));

        return polygon
            .setFillStrokeColorWidth('none', '#455a64', 2)
            .build();
    }
}
