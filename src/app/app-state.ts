export enum ActiveMapType {
    NONE,
    NAV_MAP,
    CHART_MAP
}


export interface AppState {
    activeMap: ActiveMapType;
}
