import {SvgPolygonElement} from '../../common/svg/svg-polygon-element';
import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {TerrainInfo} from '../domain-model/terrain-info';


export class TerrainSvg {
    public static create(terrain: TerrainInfo, maxElevation: Length, imageWidthPx: number, imageHeightPx: number): SVGPolygonElement {
        const points: [number, number][] = [];

        // point bottom left
        points.push(
            TerrainSvg.getPoint(
                Length.createZero(),
                Length.createZero(),
                terrain.totalDistance,
                maxElevation,
                imageWidthPx,
                imageHeightPx
            )
        );

        // terrain altitude points
        for (let i = 0; i < terrain.distanceElevations.length; i++) {
            points.push(
                TerrainSvg.getPoint(
                    terrain.distanceElevations[i].first,
                    terrain.distanceElevations[i].second,
                    terrain.totalDistance,
                    maxElevation,
                    imageWidthPx,
                    imageHeightPx
                )
            );
        }

        // point top right
        points.push(
            TerrainSvg.getPoint(
                terrain.totalDistance,
                terrain.distanceElevations[terrain.distanceElevations.length - 1].second,
                terrain.totalDistance,
                maxElevation,
                imageWidthPx,
                imageHeightPx
            )
        );

        // point bottom right
        points.push(
            TerrainSvg.getPoint(
                terrain.totalDistance,
                Length.createZero(),
                terrain.totalDistance,
                maxElevation,
                imageWidthPx,
                imageHeightPx
            )
        );

        return SvgPolygonElement.create(
            points,
            'fill:lime; stroke:darkgreen; stroke-width:0.5px'
        );
    }


    private static getPoint(
        dist: Length,
        height: Length,
        maxdistance: Length,
        maxelevation: Length,
        imageWidthPx: number,
        imageHeightPx: number
    ): [number, number] {
        const x = Math.round(dist.m / maxdistance.m * imageWidthPx);
        const y = Math.round((maxelevation.m - height.m) / maxelevation.m * imageHeightPx);

        return [x, y];
    }
}
