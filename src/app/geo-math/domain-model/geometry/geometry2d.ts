export interface Geometry2d {
    getGeometryType(): Geometry2dType;
}


export enum Geometry2dType {
    POSITION,
    LINE,
    POLYGON,
    MULTIPOLYGON,
    CIRCLE
}
