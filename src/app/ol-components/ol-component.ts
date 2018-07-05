import * as ol from 'openlayers';
import {Position2d} from '../model/geometry/position2d';
import {DataItem} from '../model/data-item';
import {MapContext} from '../core/services/map/map.service';


export abstract class OlComponent {
    public static readonly PROPERTYNAME_DATAITEM = 'navplanDataItem';


    constructor(protected mapContext: MapContext) {
    }


    public abstract destroy();


    protected createFeature(dataItem$: DataItem): ol.Feature {
        const feature = new ol.Feature();
        feature.set(OlComponent.PROPERTYNAME_DATAITEM, dataItem$, true);
        return feature;
    }


    protected removeFeature(feature: ol.Feature, source: ol.source.Vector) {
        this.removeFeatures([feature], source);
    }


    protected removeFeatures(featureList: ol.Feature[], source: ol.source.Vector) {
        for (const feature of featureList) {
            feature.unset(OlComponent.PROPERTYNAME_DATAITEM, true);
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
            const newPos = position.getMercator();
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
        const newPosList = positionList ? positionList.map((pos) => pos.getMercator()) : undefined;
        const olLine = (feature.getGeometry() as ol.geom.LineString);
        if (!olLine) {
            feature.setGeometry(new ol.geom.LineString(newPosList));
        } else {
            olLine.setCoordinates(newPosList);
        }
    }
}
