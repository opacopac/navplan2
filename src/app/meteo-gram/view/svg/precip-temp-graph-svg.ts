import {SvgElement} from '../../../common/svg/svg-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {CloudMeteogram} from '../../domain/model/cloud-meteogram';
import {ForecastRun} from '../../../meteo-dwd/domain/model/forecast-run';
import {PrecipBarsSvg} from './precip-bars-svg';
import {WidthGridFcStepsSvg} from './width-grid-fc-steps-svg';
import {PrecipTempGridSvg} from './precip-temp-grid-svg';
import {TemmpGraphSvg} from './temp-graph-svg';


export class PrecipTempGraphSvg {
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

        svg.appendChild(PrecipBarsSvg.create(cloudMeteogram.steps));
        svg.appendChild(TemmpGraphSvg.create(cloudMeteogram.steps));
        svg.appendChild(PrecipTempGridSvg.create());
        svg.appendChild(WidthGridFcStepsSvg.create(fcRun, cloudMeteogram.steps, false));

        return svg;
    }
}
