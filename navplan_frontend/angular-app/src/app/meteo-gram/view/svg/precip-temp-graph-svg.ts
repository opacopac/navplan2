import {CloudMeteogram} from '../../domain/model/cloud-meteogram';
import {ForecastRun} from '../../../meteo-dwd/domain/model/forecast-run';
import {PrecipBarsSvg} from './precip-bars-svg';
import {WidthGridFcStepsSvg} from './width-grid-fc-steps-svg';
import {PrecipTempGridSvg} from './precip-temp-grid-svg';
import {TempLineSvg} from './temp-line-svg';
import {TemperatureUnit} from '../../../geo-physics/domain/model/quantities/temperature-unit';
import {PrecipitationUnit} from '../../../geo-physics/domain/model/quantities/precipitation-unit';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {SvgBuilder} from '../../../common/svg/svg-builder';


export class PrecipTempGraphSvg {
    public static create(
        cloudMeteogram: CloudMeteogram,
        fcRun: ForecastRun,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .setCssClass('map-terrain-svg')
            .build();
        // TODO
        const tempUnit = TemperatureUnit.C;
        const precipUnit = PrecipitationUnit.MM;

        const minMaxTemp = this.calcMinMaxDisplayTemp(cloudMeteogram.steps, tempUnit);
        const maxPrecipMm = this.calcMaxDisplayPrecip(cloudMeteogram, precipUnit);

        svg.appendChild(TempLineSvg.create(cloudMeteogram.steps, minMaxTemp, tempUnit));
        svg.appendChild(PrecipBarsSvg.create(cloudMeteogram.steps, maxPrecipMm, precipUnit));
        svg.appendChild(PrecipTempGridSvg.create(minMaxTemp, maxPrecipMm, tempUnit));
        svg.appendChild(WidthGridFcStepsSvg.create(fcRun, cloudMeteogram.steps, false));

        return svg;
    }


    private static calcMinMaxDisplayTemp(cloudMeteogramSteps: CloudMeteogramStep[], tempUnit: TemperatureUnit): [number, number] {
        const ascendingTemps = cloudMeteogramSteps
            .map(step => step.temp.getValue(tempUnit))
            .sort((a, b) => a - b);
        const minTemp = ascendingTemps[0];
        const maxTemp = ascendingTemps[ascendingTemps.length - 1];
        const tempStepDisplay = tempUnit === TemperatureUnit.C ? 5 : 10; // TODO
        const minTempDisplay = Math.floor(minTemp / tempStepDisplay) * tempStepDisplay;
        const maxTempDisplay = minTempDisplay + 4 * tempStepDisplay;

        return [minTempDisplay, maxTempDisplay];
    }


    private static calcMaxDisplayPrecip(cloudMeteogram: CloudMeteogram, precipUnit: PrecipitationUnit): number {
        const maxPrecip = cloudMeteogram.steps
            .map(step => step.precip.getValue(precipUnit))
            .reduce((a, b) => Math.max(a, b));

        return Math.max(4, Math.ceil(maxPrecip / 4) * 4);
    }
}
