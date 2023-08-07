import {SvgElement} from '../../../common/svg/svg-element';
import {CloudMeteogram} from '../../domain/model/cloud-meteogram';
import {ForecastRun} from '../../../meteo-dwd/domain/model/forecast-run';
import {PrecipBarsSvg} from './precip-bars-svg';
import {WidthGridFcStepsSvg} from './width-grid-fc-steps-svg';
import {PrecipTempGridSvg} from './precip-temp-grid-svg';
import {TemmpGraphSvg} from './temp-graph-svg';
import {TemperatureUnit} from '../../../geo-physics/domain/model/quantities/temperature-unit';


export class PrecipTempGraphSvg {
    public static create(
        cloudMeteogram: CloudMeteogram,
        fcRun: ForecastRun,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const svg = SvgElement.create(
            imageWidthPx.toString(),
            imageHeightPx.toString(),
            'none',
            'map-terrain-svg'
        );

        const minMaxTemp = this.calcMinMaxDisplayTemp(cloudMeteogram, TemperatureUnit.C); // TODO
        const maxPrecipMm = this.calcMaxDisplayPrecip(cloudMeteogram);

        svg.appendChild(TemmpGraphSvg.create(cloudMeteogram.steps, minMaxTemp, TemperatureUnit.C)); // TODO
        svg.appendChild(PrecipBarsSvg.create(cloudMeteogram.steps, maxPrecipMm));
        svg.appendChild(PrecipTempGridSvg.create(minMaxTemp, maxPrecipMm, TemperatureUnit.C)); // TODO
        svg.appendChild(WidthGridFcStepsSvg.create(fcRun, cloudMeteogram.steps, false));

        return svg;
    }


    private static calcMinMaxDisplayTemp(cloudMeteogram: CloudMeteogram, tempUnit: TemperatureUnit): [number, number] {
        const ascendingTemps = cloudMeteogram.steps
            .map(step => step.temperature.getValue(tempUnit))
            .sort((a, b) => a - b);
        const minTemp = ascendingTemps[0] - 2;
        const maxTemp = ascendingTemps[ascendingTemps.length - 1] + 2;
        const tempStepDisplay = Math.ceil((maxTemp - minTemp) / 4); // TODO
        const minTempDisplay = Math.floor(minTemp);
        const maxTempDisplay = minTempDisplay + 4 * tempStepDisplay; // TODO

        return [minTempDisplay, maxTempDisplay];
    }


    private static calcMaxDisplayPrecip(cloudMeteogram: CloudMeteogram): number {
        const maxPrecip = cloudMeteogram.steps
            .map(step => step.precipMmPerHour)
            .reduce((a, b) => Math.max(a, b));

        return Math.max(4,  Math.ceil(maxPrecip / 4) * 4);
    }
}
