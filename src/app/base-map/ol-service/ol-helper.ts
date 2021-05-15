import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {fromLonLat, toLonLat, transformExtent} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import {Vector} from 'ol/source';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Feature} from 'ol';
import {LineString, MultiLineString, Point as OlPoint, Polygon as OlPoly} from 'ol/geom';
import {Polygon} from '../../common/geo-math/domain-model/geometry/polygon';
import {Multipolygon} from '../../common/geo-math/domain-model/geometry/multipolygon';
import Geometry from 'ol/geom/Geometry';
import {DataItem} from '../../common/model/data-item';
import {Coordinate} from 'ol/coordinate';

const MERCATOR_PROJECTION = 'EPSG:3857';
const LONLAT_PROJECTION = 'EPSG:4326';


export class OlHelper {
    public static readonly PROPERTYNAME_DATAITEM = 'navplanDataItem';
    public static readonly PROPERTYNAME_ISSELECTABLE = 'navplanIsSelectable';


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
        const ext = transformExtent(extent, MERCATOR_PROJECTION, LONLAT_PROJECTION);
        return new Extent2d(ext[0], ext[1], ext[2], ext[3]);
    }


    public static getExtentAsMercator(extent: Extent2d): [number, number, number, number] {
        const arr = transformExtent(
            [extent.minLon, extent.minLat, extent.maxLon, extent.maxLat],
            LONLAT_PROJECTION,
            MERCATOR_PROJECTION
        );

        return [arr[0], arr[1], arr[2], arr[3]];
    }


    public static calcDegPerPixelByZoom(zoom: number, tileWidthPixel = 256): number {
        return 360.0 / (Math.pow(2, zoom) * tileWidthPixel);
    }


    public static createEmptyVectorLayer(imageRenderMode: boolean = false): VectorLayer {
        return new VectorLayer({
            source: new Vector({}),
            // renderMode: imageRenderMode ? 'image' : undefined
        });
    }


    public static createFeature(dataItem: DataItem, isSelectable: boolean): Feature {
        const feature = new Feature();
        feature.set(OlHelper.PROPERTYNAME_DATAITEM, dataItem, true);
        feature.set(OlHelper.PROPERTYNAME_ISSELECTABLE, isSelectable, true);
        return feature;
    }


    public static isSelectable(olFeature: Feature): boolean {
        if (!olFeature) {
            return false;
        } else {
            return (olFeature.get(this.PROPERTYNAME_ISSELECTABLE) === true);
        }
    }


    public static getDataItem(olFeature: Feature): DataItem {
        if (!olFeature) {
            return undefined;
        } else {
            return olFeature.get(this.PROPERTYNAME_DATAITEM) as DataItem;
        }
    }


    public static getPointGeometry(position: Position2d): Geometry {
        if (!position) {
            return undefined;
        } else {
            const newPos = OlHelper.getMercator(position);
            return new OlPoint(newPos);
        }
    }


    public static getLineGeometry(positionList: Position2d[]): Geometry {
        if (!positionList) {
            return undefined;
        } else {
            const newPosList = positionList ? positionList.map((pos) => OlHelper.getMercator(pos)) : undefined;
            return new LineString(newPosList);
        }
    }


    public static getMultiLineGeometry(positionList: Position2d[][]): Geometry {
        if (!positionList) {
            return undefined;
        } else {
            const newPosList = positionList ? positionList.map(posList => posList.map(pos => OlHelper.getMercator(pos))) : undefined;
            return new MultiLineString(newPosList);
        }
    }


    public static getPolygonGeometry(polygon: Polygon): Geometry {
        if (!polygon) {
            return undefined;
        } else {
            const newPolygon = polygon ? polygon.positions.map(pos => OlHelper.getMercator(pos)) : undefined;
            return new OlPoly([newPolygon]);
        }
    }


    public static getMultiPolygonGeometry(multiPolygon: Multipolygon): Geometry {
        if (!multiPolygon) {
            return undefined;
        } else {
            const newPolygon = multiPolygon ? multiPolygon.polygons.map(poly => {
                return poly.positions.map(pos => OlHelper.getMercator(pos));
            }) : undefined;
            return new OlPoly(newPolygon);
        }
    }
}
