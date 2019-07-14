import {Action} from '@ngrx/store';
import {Position2d} from '../../geo-math/domain/geometry/position2d';


export enum ChartMapActionTypes {
    CHARTMAP_ACTIVATE = '[AppEffects] activate chart map',
    CHARTMAP_CLICKED = '[Chart Map] clicked',
}


export class ChartMapActivateAction implements Action {
    readonly type = ChartMapActionTypes.CHARTMAP_ACTIVATE;

    constructor(public isActive: boolean) {}
}


export class ChartMapClickedAction implements Action {
    readonly type = ChartMapActionTypes.CHARTMAP_CLICKED;

    constructor(public clickPos: Position2d) {}
}

export type ChartMapActions =
    ChartMapActivateAction |
    ChartMapClickedAction;
