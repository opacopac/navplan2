import {Geometry, LineString, MultiLineString, Point as OlPoint, Polygon as OlPoly} from 'ol/geom';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Polygon} from '../../../geo-physics/domain/model/geometry/polygon';
import {Multipolygon} from '../../../geo-physics/domain/model/geometry/multipolygon';
import {fromLonLat, toLonLat, transformExtent} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';


export class OlGeometry {
    public static readonly MERCATOR_PROJECTION = 'EPSG:3857';
    public static readonly LONLAT_PROJECTION = 'EPSG:4326';


    private constructor(public readonly geometry: Geometry) {
    }


    public static fromPoint(position: Position2d): OlGeometry {
        if (!position) {
            return undefined;
        } else {
            const newPos = OlGeometry.getMercator(position);
            return new OlGeometry(new OlPoint(newPos));
        }
    }


    public static fromLine(positionList: Position2d[]): OlGeometry {
        if (!positionList) {
            return undefined;
        } else {
            const newPosList = positionList ? positionList.map((pos) => OlGeometry.getMercator(pos)) : undefined;
            return new OlGeometry(new LineString(newPosList));
        }
    }


    public static fromMultiLine(positionList: Position2d[][]): OlGeometry {
        if (!positionList) {
            return undefined;
        } else {
            const newPosList = positionList ? positionList.map(posList => posList.map(pos => OlGeometry.getMercator(pos))) : undefined;
            return new OlGeometry(new MultiLineString(newPosList));
        }
    }


    public static fromPolygon(polygon: Polygon): OlGeometry {
        if (!polygon) {
            return undefined;
        } else {
            const newPolygon = polygon ? polygon.positions.map(pos => OlGeometry.getMercator(pos)) : undefined;
            return new OlGeometry(new OlPoly([newPolygon]));
        }
    }


    public static fromMultiPolygon(multiPolygon: Multipolygon): OlGeometry {
        if (!multiPolygon) {
            return undefined;
        } else {
            const newPolygon = multiPolygon ? multiPolygon.polygons.map(poly => {
                return poly.positions.map(pos => OlGeometry.getMercator(pos));
            }) : undefined;
            return new OlGeometry(new OlPoly(newPolygon));
        }
    }


    public static getMercator(pos: Position2d): [number, number] {
        const arr = fromLonLat(pos.toArray());

        return [arr[0], arr[1]];
    }


    public static getPosFromMercator(mercator: [number, number]): Position2d {
        const lonLat = toLonLat(mercator);

        return new Position2d(lonLat[0], lonLat[1]);
    }


    public static getPosFromMercatorCoords(mercatorCoords: Coordinate): Position2d {
        const lonLat = toLonLat(mercatorCoords);

        return new Position2d(lonLat[0], lonLat[1]);
    }


    public static getExtentFromMercator(extent: [number, number, number, number]): Extent2d {
        const ext = transformExtent(extent, OlGeometry.MERCATOR_PROJECTION, OlGeometry.LONLAT_PROJECTION);
        return new Extent2d(ext[0], ext[1], ext[2], ext[3]);
    }


    public static getExtentAsMercator(extent: Extent2d): [number, number, number, number] {
        const arr = transformExtent(
            [extent.minLon, extent.minLat, extent.maxLon, extent.maxLat],
            OlGeometry.LONLAT_PROJECTION,
            OlGeometry.MERCATOR_PROJECTION
        );

        return [arr[0], arr[1], arr[2], arr[3]];
    }


    public static calcDegPerPixelByZoom(zoom: number, tileWidthPixel = 256): number {
        return 360.0 / (Math.pow(2, zoom) * tileWidthPixel);
    }
}
