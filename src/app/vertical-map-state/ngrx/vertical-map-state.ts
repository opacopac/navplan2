import {VerticalMap} from '../../vertical-map/domain-model/vertical-map';
import {VerticalMapButtonStatus} from '../../vertical-map/domain-model/vertical-map-button-status';


export interface VerticalMapState {
    buttonStatus: VerticalMapButtonStatus;
    verticalMap: VerticalMap;
}
