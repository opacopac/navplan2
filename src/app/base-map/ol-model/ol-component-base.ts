import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {LineString, Point as OlPoint, Polygon as OlPoly} from 'ol/geom';
import {Position2d} from '../../geo-math/domain-model/geometry/position2d';
import {DataItem} from '../../shared/model/data-item';
import {Polygon} from '../../geo-math/domain-model/geometry/polygon';
import {Multipolygon} from '../../geo-math/domain-model/geometry/multipolygon';
import {OlBaseMapService} from '../ol-service/ol-base-map.service';


export abstract class OlComponentBase {
    public static readonly PROPERTYNAME_DATAITEM = 'navplanDataItem';
    public static readonly PROPERTYNAME_ISSELECTABLE = 'navplanIsSelectable';


    protected constructor() {
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


    public abstract get isSelectable(): boolean;


    protected createFeature(dataItem: DataItem): Feature {
        const feature = new Feature();
        feature.set(OlComponentBase.PROPERTYNAME_DATAITEM, dataItem, true);
        feature.set(OlComponentBase.PROPERTYNAME_ISSELECTABLE, this.isSelectable, true);
        return feature;
    }


    protected removeFeature(feature: Feature, source: Vector) {
        this.removeFeatures([feature], source);
    }


    protected removeFeatures(featureList: Feature[], source: Vector) {
        for (const feature of featureList) {
            feature.unset(OlComponentBase.PROPERTYNAME_DATAITEM, true);
            source.removeFeature(feature);
        }
    }


    protected hideFeature(feature: Feature) {
        feature.setGeometry(undefined);
    }


    protected setPointGeometry(feature: Feature, position: Position2d) {
        if (!position) {
            this.hideFeature(feature);
        } else {
            const newPos = OlBaseMapService.getMercator(position);
            const olPoint = (feature.getGeometry() as OlPoint);
            if (!olPoint) {
                feature.setGeometry(new OlPoint(newPos));
            } else {
                olPoint.setCoordinates(newPos);
            }
        }
    }


    protected setLineGeometry(feature: Feature, positionList: Position2d[]) {
        if (!positionList) {
            this.hideFeature(feature);
        }
        const newPosList = positionList ? positionList.map((pos) => OlBaseMapService.getMercator(pos)) : undefined;
        const olLine = (feature.getGeometry() as LineString);
        if (!olLine) {
            feature.setGeometry(new LineString(newPosList));
        } else {
            olLine.setCoordinates(newPosList);
        }
    }


    protected setPolygonGeometry(feature: Feature, polygon: Polygon) {
        if (!polygon) {
            this.hideFeature(feature);
        }
        const newPolygon = polygon ? polygon.positions.map(pos => OlBaseMapService.getMercator(pos)) : undefined;
        const olPolygon = (feature.getGeometry() as OlPoly);
        if (!olPolygon) {
            feature.setGeometry(new OlPoly([newPolygon]));
        } else {
            olPolygon.setCoordinates([newPolygon]);
        }
    }


    protected setMultiPolygonGeometry(feature: Feature, multiPolygon: Multipolygon) {
        if (!multiPolygon) {
            this.hideFeature(feature);
        }
        const newPolygon = multiPolygon ? multiPolygon.polygons.map(poly => {
            return poly.positions.map(pos => OlBaseMapService.getMercator(pos));
        }) : undefined;
        const olPolygon = (feature.getGeometry() as OlPoly);
        if (!olPolygon) {
            feature.setGeometry(new OlPoly(newPolygon));
        } else {
            olPolygon.setCoordinates(newPolygon);
        }
    }
}
