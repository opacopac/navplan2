import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {VerticalMapTerrainStep} from '../../domain/model/vertical-map-terrain-step';
import {SvgPolygonBuilder} from '../../../common/svg/svg-polygon-builder';


export class TerrainSvg {
    public static create(terrainSteps: VerticalMapTerrainStep[], imgDim: ImageDimensionsSvg): SVGPolygonElement {
        const polygon = SvgPolygonBuilder.builder()

        // point bottom left
        polygon.addPoint(imgDim.calcXy(Length.ofZero(), Length.ofZero()));

        // terrain altitude points
        for (let i = 0; i < terrainSteps.length; i++) {
            polygon.addPoint(imgDim.calcXy(terrainSteps[i].horDist, terrainSteps[i].elevationAmsl));
        }

        // point top right
        polygon.addPoint(imgDim.calcXy(imgDim.maxWidth, terrainSteps[terrainSteps.length - 1].elevationAmsl));

        // point bottom right
        polygon.addPoint(imgDim.calcXy(imgDim.maxWidth, Length.ofZero()));

        return polygon
            .setFillStrokeColorWidth('lime', 'darkgreen', 0.5)
            .build();
    }
}
