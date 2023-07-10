import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class MeteogramTerrainSvg {
    public static create(terrainElevation: Length, imgDimensions: ImageDimensionsSvg): SVGPolygonElement {
        const points: [number, number][] = [];

        // point bottom left
        points.push(imgDimensions.calcXy(Length.createZero(), Length.createZero()));

        // point top left
        points.push(imgDimensions.calcXy(Length.createZero(), terrainElevation));

        // point top right
        points.push(imgDimensions.calcXy(imgDimensions.maxWidth, terrainElevation));

        // point bottom right
        points.push(imgDimensions.calcXy(imgDimensions.maxWidth, Length.createZero()));

        return SvgPolygonElement.create(
            points,
            'fill:lime; stroke:darkgreen; stroke-width:0.5px'
        );
    }
}
