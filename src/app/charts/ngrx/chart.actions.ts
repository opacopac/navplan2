import {Action} from '@ngrx/store';


export enum ChartActionTypes {
    AD_CHART_LOAD = '[Charts] Load AD Chart Action',
}


export class LoadAdChartAction implements Action {
    readonly type = ChartActionTypes.AD_CHART_LOAD;

    constructor(public chartId: number) {}
}


export type ChartActions =
    LoadAdChartAction;
