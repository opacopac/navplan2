import {Fill, Stroke, Style} from 'ol/style';


export class OlAirspaceStyles {
    public static readonly CTR = new Style({
        fill: new Fill({
            color: 'rgba(152, 206, 235, 0.3)'
        }),
        stroke: new Stroke({
            color: 'rgba(23, 128, 194, 0.8)',
            width: 3,
            lineDash: [10, 7]
        })
    });

    public static readonly A = new Style({
        stroke: new Stroke({
            color: 'rgba(174, 30, 34, 0.8)',
            width: 3
        })
    });

    public static readonly B_C_D = new Style({
        stroke: new Stroke({
            color: 'rgba(23, 128, 194, 0.8)',
            width: 3
        })
    });

    public static readonly E = new Style({
        stroke: new Stroke({
            color: 'rgba(23, 128, 194, 0.8)',
            width: 2
        })
    });

    public static readonly D_R_P = new Style({
        stroke: new Stroke({
            color: 'rgba(174, 30, 34, 0.8)',
            width: 2
        })
    });

    public static readonly TMZ_RMZ_FIZ = new Style({
        /*fill: new Fill({
         color: 'rgba(152, 206, 235, 0.3)'
         }),*/
        stroke: new Stroke({
            color: 'rgba(23, 128, 194, 0.8)',
            // color: 'rgba(0, 0, 0, 1.0)',
            width: 3,
            lineDash: [1, 7]
        })
    });

    public static readonly FIR_UIR = new Style({
        /*fill: new Fill({
         color: 'rgba(152, 206, 235, 0.3)'
         }),*/
        stroke: new Stroke({
            color: 'rgba(0, 150, 64, 0.8)',
            width: 3,
            lineDash: [5, 20]
        })
    });

    public static readonly GLD = new Style({
        stroke: new Stroke({
            color: 'rgba(0, 150, 64, 0.8)',
            width: 2
        })
    });
}
