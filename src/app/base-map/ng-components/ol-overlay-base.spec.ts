import {OlOverlayBase} from './ol-overlay-base';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {DataItem} from '../../common/model/data-item';
import {Directive} from '@angular/core';


@Directive()
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
