import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {VerticalMapTerrainStep} from '../../domain/model/vertical-map-terrain-step';


export class TerrainSvg {
    public static create(terrainSteps: VerticalMapTerrainStep[], imgDim: ImageDimensionsSvg): SVGPolygonElement {
        const points: [number, number][] = [];

        // point bottom left
        points.push(imgDim.calcXy(Length.createZero(), Length.createZero()));

        // terrain altitude points
        for (let i = 0; i < terrainSteps.length; i++) {
            points.push(imgDim.calcXy(terrainSteps[i].horDist, terrainSteps[i].elevationAmsl));
        }

        // point top right
        points.push(imgDim.calcXy(imgDim.maxWidth, terrainSteps[terrainSteps.length - 1].elevationAmsl));

        // point bottom right
        points.push(imgDim.calcXy(imgDim.maxWidth, Length.createZero()));

        return SvgPolygonElement.create(
            points,
            'fill:lime; stroke:darkgreen; stroke-width:0.5px'
        );
    }
}
