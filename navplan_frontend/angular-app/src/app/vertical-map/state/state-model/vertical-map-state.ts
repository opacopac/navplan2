import {VerticalMap} from '../../domain/model/vertical-map';
import {VerticalMapButtonStatus} from '../../domain/model/vertical-map-button-status';


export interface VerticalMapState {
    buttonStatus: VerticalMapButtonStatus;
    verticalMap: VerticalMap;
}
