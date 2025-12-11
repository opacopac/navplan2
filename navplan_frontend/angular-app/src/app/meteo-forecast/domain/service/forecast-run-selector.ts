import {ForecastRun} from '../model/forecast-run';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


export class ForecastRunSelector {
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

        // Sort by grid resolution (shortest distance = highest resolution = best quality)
        matchingRuns.sort((a, b) => {
            const resolutionA = a.model.gridResolution?.getValue(LengthUnit.M) ?? Number.MAX_VALUE;
            const resolutionB = b.model.gridResolution?.getValue(LengthUnit.M) ?? Number.MAX_VALUE;
            return resolutionA - resolutionB;
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
