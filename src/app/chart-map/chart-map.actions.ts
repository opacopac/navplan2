import {Action} from '@ngrx/store';
import {Position2d} from '../shared/model/geometry/position2d';


export enum ChartMapActionTypes {
    CHARTMAP_CLICKED = '[Chart Map] clicked',
}


export class ChartMapClickedAction implements Action {
    readonly type = ChartMapActionTypes.CHARTMAP_CLICKED;

    constructor(public clickPos: Position2d) {}
}

export type ChartMapActions =
    ChartMapClickedAction;
