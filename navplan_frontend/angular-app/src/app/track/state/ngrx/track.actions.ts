import {createAction, props} from '@ngrx/store';
import {Track} from '../../domain/model/track';
import {TrackProfile} from '../../domain/model/track-profile';
import {TableState} from '../../../common/state/model/table-state';


export class TrackActions {
    public static readonly selectTrackTab = createAction(
        '[Tracks Tabs] Select track tab',
        props<{ selectedTab: string }>()
    );

    public static readonly readList = createAction(
        '[Tracks Page] read track list'
    );

    public static readonly readListSuccess = createAction(
        '[Tracks Effects] read track list success',
        props<{ trackList: Track[] }>()
    );

    public static readonly readListError = createAction(
        '[Tracks Effects] read track list error',
        props<{ error: Error }>()
    );

    public static readonly toggleSelect = createAction(
        '[Tracks Page] toggle select track',
        props<{ trackId: number }>()
    );

    public static readonly read = createAction(
        '[Tracks Effects] read track',
        props<{ trackId: number }>()
    );

    public static readonly readSuccess = createAction(
        '[Tracks Effects] read track success',
        props<{ track: Track }>()
    );

    public static readonly readError = createAction(
        '[Tracks Effects] read track error',
        props<{ error: Error }>()
    );

    public static readonly update = createAction(
        '[Tracks Page] update track',
        props<{ track: Track }>()
    );

    public static readonly updateSuccess = createAction(
        '[Tracks Effects] update track success',
        props<{ track: Track }>()
    );

    public static readonly delete = createAction(
        '[Tracks Page] delete track',
        props<{ trackId: number }>()
    );

    public static readonly deleteSuccess = createAction(
        '[Tracks Effects] Delete track success',
        props<{ trackId: number }>()
    );

    public static readonly exportKml = createAction(
        '[Tracks Page] export track KML',
        props<{ trackId: number }>()
    );

    public static readonly clear = createAction(
        '[ClearDialog] clear track'
    );

    public static readonly updateTrackProfile = createAction(
        '[Tracks Effects] update track profile',
        props<{ trackProfile: TrackProfile }>()
    );

    public static readonly updateTrackTableState = createAction(
        '[Tracks Page] update track table state',
        props<{ tableState: TableState }>()
    );
}
