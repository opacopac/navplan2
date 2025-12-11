import {ForecastRun} from '../model/forecast-run';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {WeatherModelType} from '../model/weather-model-type';


export class ForecastRunSelector {
    private static readonly MODEL_PRIORITY: Map<WeatherModelType, number> = new Map([
        [WeatherModelType.ICON_CH1, 1],
        [WeatherModelType.ICON_D2, 2],
        [WeatherModelType.ICON_EU, 3],
        [WeatherModelType.ICON, 4]
    ]);


    public static selectBestForecastRun(
        forecastRuns: ForecastRun[],
        mapExtent: Extent2d
    ): ForecastRun | undefined {
        if (!forecastRuns || forecastRuns.length === 0 || !mapExtent) {
            return undefined;
        }

        // Filter forecast runs that cover the map extent
        const matchingRuns = forecastRuns.filter(run => 
            this.coverageContainsExtent(run, mapExtent)
        );

        if (matchingRuns.length === 0) {
            // If no run covers the extent, return the latest run
            return forecastRuns[forecastRuns.length - 1];
        }

        // Sort by priority (lower number = higher priority)
        matchingRuns.sort((a, b) => {
            const priorityA = this.MODEL_PRIORITY.get(a.model.modelType) ?? 999;
            const priorityB = this.MODEL_PRIORITY.get(b.model.modelType) ?? 999;
            return priorityA - priorityB;
        });

        return matchingRuns[0];
    }


    private static coverageContainsExtent(run: ForecastRun, extent: Extent2d): boolean {
        if (!run.model.spatialCoverage || run.model.spatialCoverage.positions.length < 3) {
            return false;
        }

        // Check if all 4 corners of the extent are within the coverage polygon
        const corners = [
            extent.minPos,
            extent.maxPos,
            extent.minPos.clone(), // min lon, max lat
            extent.maxPos.clone()  // max lon, min lat
        ];
        corners[2].latitude = extent.maxLat;
        corners[3].latitude = extent.minLat;

        // All corners must be inside the coverage polygon
        return corners.every(corner => run.model.spatialCoverage.containsPoint(corner));
    }
}
