import * as ol from 'openlayers';
import {Position2d} from '../../shared/model/geometry/position2d';
import {DataItem} from '../../shared/model/data-item';
import {Polygon} from '../../shared/model/geometry/polygon';
import {Multipolygon} from '../../shared/model/geometry/multipolygon';
import {OlHelper} from '../model/ol-helper';


export abstract class OlComponentBase {
    public static readonly PROPERTYNAME_DATAITEM = 'navplanDataItem';
    public static readonly PROPERTYNAME_ISSELECTABLE = 'navplanIsSelectable';


    constructor() {
    }


    public static isSelectable(olFeature: ol.Feature): boolean {
        if (!olFeature) {
            return false;
        } else {
            return (olFeature.get(this.PROPERTYNAME_ISSELECTABLE) === true);
        }
    }


    public static getDataItem(olFeature: ol.Feature): DataItem {
        if (!olFeature) {
            return undefined;
        } else {
            return olFeature.get(this.PROPERTYNAME_DATAITEM) as DataItem;
        }
    }


    public abstract get isSelectable(): boolean;


    protected createFeature(dataItem: DataItem): ol.Feature {
        const feature = new ol.Feature();
        feature.set(OlComponentBase.PROPERTYNAME_DATAITEM, dataItem, true);
        feature.set(OlComponentBase.PROPERTYNAME_ISSELECTABLE, this.isSelectable, true);
        return feature;
    }


    protected removeFeature(feature: ol.Feature, source: ol.source.Vector) {
        this.removeFeatures([feature], source);
    }


    protected removeFeatures(featureList: ol.Feature[], source: ol.source.Vector) {
        for (const feature of featureList) {
            feature.unset(OlComponentBase.PROPERTYNAME_DATAITEM, true);
            source.removeFeature(feature);
        }
    }


    protected hideFeature(feature: ol.Feature) {
        feature.setGeometry(undefined);
    }


    protected setPointGeometry(feature: ol.Feature, position: Position2d) {
        if (!position) {
            this.hideFeature(feature);
        } else {
            const newPos = OlHelper.getMercator(position);
            const olPoint = (feature.getGeometry() as ol.geom.Point);
            if (!olPoint) {
                feature.setGeometry(new ol.geom.Point(newPos));
            } else {
                olPoint.setCoordinates(newPos);
            }
        }
    }


    protected setLineGeometry(feature: ol.Feature, positionList: Position2d[]) {
        if (!positionList) {
            this.hideFeature(feature);
        }
        const newPosList = positionList ? positionList.map((pos) => OlHelper.getMercator(pos)) : undefined;
        const olLine = (feature.getGeometry() as ol.geom.LineString);
        if (!olLine) {
            feature.setGeometry(new ol.geom.LineString(newPosList));
        } else {
            olLine.setCoordinates(newPosList);
        }
    }


    protected setPolygonGeometry(feature: ol.Feature, polygon: Polygon) {
        if (!polygon) {
            this.hideFeature(feature);
        }
        const newPolygon = polygon ? polygon.positions.map(pos => OlHelper.getMercator(pos)) : undefined;
        const olPolygon = (feature.getGeometry() as ol.geom.Polygon);
        if (!olPolygon) {
            feature.setGeometry(new ol.geom.Polygon([newPolygon]));
        } else {
            olPolygon.setCoordinates([newPolygon]);
        }
    }


    protected setMultiPolygonGeometry(feature: ol.Feature, multiPolygon: Multipolygon) {
        if (!multiPolygon) {
            this.hideFeature(feature);
        }
        const newPolygon = multiPolygon ? multiPolygon.polygons.map(poly => {
            return poly.positions.map(pos => OlHelper.getMercator(pos));
        }) : undefined;
        const olPolygon = (feature.getGeometry() as ol.geom.Polygon);
        if (!olPolygon) {
            feature.setGeometry(new ol.geom.Polygon(newPolygon));
        } else {
            olPolygon.setCoordinates(newPolygon);
        }
    }
}
