import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {SvgPolygonBuilder} from '../../../common/svg/svg-polygon-builder';
import {ImageTimePxDimensionsSvg} from '../../../common/svg/image-time-px-dimensions-svg';


export class AltitudeProfileSvg {
    public static create(altitudeProfile: [Length, Date][], imgDim: ImageTimePxDimensionsSvg): SVGPolygonElement {
        const polygon = SvgPolygonBuilder.builder();

        // point bottom left
        polygon.addPoint(imgDim.calcXy(altitudeProfile[0][1], 0));

        // altitude points
        for (let i = 0; i < altitudeProfile.length; i++) {
            polygon.addPoint(imgDim.calcXy(altitudeProfile[i][1], altitudeProfile[i][0].ft / 50)); // TODO
        }

        // point top right
        const lastAlt = altitudeProfile[altitudeProfile.length - 1];
        polygon.addPoint(imgDim.calcXy(lastAlt[1], lastAlt[0].ft / 50)); // TODO

        // point bottom right
        polygon.addPoint(imgDim.calcXy(lastAlt[1], 0));

        return polygon
            .setFillStrokeColorWidth('lime', 'darkgreen', 0.5)
            .build();
    }
}
