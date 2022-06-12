import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {VerticalMap} from '../../domain/model/vertical-map';


export class TerrainSvg {
    public static create(verticalMap: VerticalMap, imageWidthPx: number, imageHeightPx: number): SVGPolygonElement {
        const points: [number, number][] = [];

        // point bottom left
        points.push(
            TerrainSvg.getPoint(
                Length.createZero(),
                Length.createZero(),
                verticalMap.mapWidth,
                verticalMap.mapHeight,
                imageWidthPx,
                imageHeightPx
            )
        );

        // terrain altitude points
        for (let i = 0; i < verticalMap.terrainSteps.length; i++) {
            points.push(
                TerrainSvg.getPoint(
                    verticalMap.terrainSteps[i].horDist,
                    verticalMap.terrainSteps[i].elevationAmsl,
                    verticalMap.mapWidth,
                    verticalMap.mapHeight,
                    imageWidthPx,
                    imageHeightPx
                )
            );
        }

        // point top right
        points.push(
            TerrainSvg.getPoint(
                verticalMap.mapWidth,
                verticalMap.terrainSteps[verticalMap.terrainSteps.length - 1].elevationAmsl,
                verticalMap.mapWidth,
                verticalMap.mapHeight,
                imageWidthPx,
                imageHeightPx
            )
        );

        // point bottom right
        points.push(
            TerrainSvg.getPoint(
                verticalMap.mapWidth,
                Length.createZero(),
                verticalMap.mapWidth,
                verticalMap.mapHeight,
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
        const y = Math.round((maxelevation.ft - height.ft) / maxelevation.ft * imageHeightPx);

        return [x, y];
    }
}
