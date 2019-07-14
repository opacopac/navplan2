import {OlOverlayBase} from './ol-overlay-base';
import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {DataItem} from '../../shared/model/data-item';


class OlOverlayBaseMock extends OlOverlayBase {
    protected bindDataItem(dataItem: DataItem, clickPos: Position2d) {
    }


    get containerHtmlElement(): HTMLElement {
        return undefined;
    }
}


describe('OlOverlayBase', () => {
    let olOverlayBase: OlOverlayBase;


    beforeEach(() => {
        olOverlayBase = new OlOverlayBaseMock(undefined);
    });
});
