import {Geometry} from 'ol/geom';
import {Feature} from 'ol';
import {DataItem} from '../../../common/domain/model/data-item';
import {Style} from 'ol/style';
import {OlGeometry} from './ol-geometry';


export class OlFeature {
    public static readonly PROPERTYNAME_DATAITEM = 'navplanDataItem';
    public static readonly PROPERTYNAME_ISSELECTABLE = 'navplanIsSelectable';

    public readonly feature: Feature<Geometry>;


    // TODO: remove
    public static isSelectable(olFeature: Feature<Geometry>): boolean {
        if (!olFeature) {
            return false;
        } else {
            return (olFeature.get(OlFeature.PROPERTYNAME_ISSELECTABLE) === true);
        }
    }


    // TODO: remove
    public static getDataItem(olFeature: Feature<Geometry>): DataItem {
        if (!olFeature) {
            return undefined;
        } else {
            return olFeature.get(OlFeature.PROPERTYNAME_DATAITEM) as DataItem;
        }
    }


    public constructor(dataItem: DataItem, isSelectable: boolean) {
        this.feature = new Feature();
        this.feature.set(OlFeature.PROPERTYNAME_DATAITEM, dataItem, true);
        this.feature.set(OlFeature.PROPERTYNAME_ISSELECTABLE, isSelectable, true);
    }


    public isSelectable(): boolean {
        return (this.feature.get(OlFeature.PROPERTYNAME_ISSELECTABLE) === true);
    }


    public getDataItem(): DataItem {
        return this.feature.get(OlFeature.PROPERTYNAME_DATAITEM) as DataItem;
    }


    public setGeometry(olGeometry: OlGeometry): void {
        this.feature.setGeometry(olGeometry.geometry);
    }


    public setStyle(style: Style): void {
        this.feature.setStyle(style);
    }
}
