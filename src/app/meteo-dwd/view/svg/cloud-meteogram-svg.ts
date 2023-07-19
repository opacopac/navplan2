import {SvgElement} from '../../../common/svg/svg-element';
import {MeteogramTerrainSvg} from './meteogram-terrain-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {HeightGridSvg} from './height-grid-svg';
import {MeteogramVerticalClouds} from './meteogram-vertical-clouds-svg';
import {CloudMeteogram} from '../../domain/model/cloud-meteogram';
import {WidthGridFcStepsSvg} from './width-grid-fc-steps-svg';
import {ForecastRun} from '../../domain/model/forecast-run';


export class CloudMeteogramSvg {
    public static create(
        cloudMeteogram: CloudMeteogram,
        fcRun: ForecastRun,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const imgDim = new ImageDimensionsSvg(
            new Length(cloudMeteogram.steps.length, LengthUnit.M), // TODO
            new Length(20000, LengthUnit.FT), // TODO
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgElement.create(
            imageWidthPx.toString(),
            imageHeightPx.toString(),
            'none',
            'map-terrain-svg'
        );

        svg.appendChild(MeteogramTerrainSvg.create(cloudMeteogram.elevation, imgDim));
        svg.appendChild(MeteogramVerticalClouds.create(cloudMeteogram.steps, imgDim));
        svg.appendChild(HeightGridSvg.create(imgDim.maxHeight));
        svg.appendChild(WidthGridFcStepsSvg.create(fcRun, cloudMeteogram.steps));

        return svg;
    }
}
