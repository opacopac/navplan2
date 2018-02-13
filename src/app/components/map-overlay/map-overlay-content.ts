import { Position2d } from '../../model/position';
import { DataItem } from '../../model/data-item';


export interface MapOverlayContent {
    bindFeatureData(dataItem: DataItem);
    getPosition(clickPos: Position2d): Position2d;
    getTitle(): string;
}
