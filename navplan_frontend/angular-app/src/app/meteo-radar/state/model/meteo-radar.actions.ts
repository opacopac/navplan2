import {createAction, props} from '@ngrx/store';
import {RadarImage} from '../../domain/model/radar-image';


export class MeteoRadarActions {
    public static readonly open = createAction(
        '[MeteoRadarButton] Open Meteo Radar',
    );

    public static readonly close = createAction(
        '[MeteoRadarButton] Close Meteo Radar',
    );

    public static readonly previousStep = createAction(
        '[MeteoRadarTimeLine] Previous Image',
    );

    public static readonly nextStep = createAction(
        '[MeteoRadarTimeLine] Next Image',
    );

    public static readonly selectStep = createAction(
        '[MeteoRadarTimeLine] Select Step',
        props<{ image: RadarImage }>()
    );

    public static readonly readAvailableRadarImages = createAction(
        '[MeteoRadarEffects] Read Available Radar Images',
    );

    public static readonly readAvailableRadarImagesSuccess = createAction(
        '[MeteoRadarEffects] Read Available Radar Images success',
        props<{ images: RadarImage[] }>()
    );

    public static readonly readMapTilesUrlSuccess = createAction(
        '[MeteoRadarEffects] Read Map Tiles Url success',
        props<{ mapTilesUrl: string }>()
    );
}
