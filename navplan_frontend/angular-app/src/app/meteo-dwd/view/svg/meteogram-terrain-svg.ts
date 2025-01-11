import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {SvgPolygonBuilder} from '../../../common/svg/svg-polygon-builder';


export class MeteogramTerrainSvg {
    public static create(terrainElevation: Length, imgDimensions: ImageDimensionsSvg): SVGPolygonElement {
        return SvgPolygonBuilder.builder()
            .addPoint(imgDimensions.calcXy(Length.ofZero(), Length.ofZero()))
            .addPoint(imgDimensions.calcXy(Length.ofZero(), terrainElevation))
            .addPoint(imgDimensions.calcXy(imgDimensions.maxWidth, terrainElevation))
            .addPoint(imgDimensions.calcXy(imgDimensions.maxWidth, Length.ofZero()))
            .setFillStrokeColorWidth('lime', 'darkgreen', 0.5)
            .build();
    }
}
