import {Action} from '@ngrx/store';
import {Track} from './model/track';


export enum TrackActionTypes {
    TRACK_READ_LIST = '[Tracks Page] read track list',
    TRACK_READ_LIST_SUCCESS = '[Tracks Service] read track list success',
    TRACK_READ_LIST_ERROR = '[Tracks Service] read track list error',
    TRACK_READ = '[Tracks Page] read track',
    TRACK_READ_SUCCESS = '[Tracks Service] read track success',
    TRACK_READ_ERROR = '[Tracks Service] read track error',
    TRACK_EXPORT_KML = '[Tracks Page] export track KML',
    TRACK_EDIT = '[Tracks Page] edit track',
    TRACK_DELETE = '[Tracks Page] delete track',
}


export class ReadTrackListAction implements Action {
    readonly type = TrackActionTypes.TRACK_READ_LIST;

    constructor() {}
}


export class ReadTrackListSuccessAction implements Action {
    readonly type = TrackActionTypes.TRACK_READ_LIST_SUCCESS;

    constructor(public trackList: Track[]) {}
}


export class ReadTrackListErrorAction implements Action {
    readonly type = TrackActionTypes.TRACK_READ_LIST_ERROR;

    constructor(public error: string) {}
}


export class ReadTrackAction implements Action {
    readonly type = TrackActionTypes.TRACK_READ;

    constructor(public id: number) {}
}


export class ReadTrackSuccessAction implements Action {
    readonly type = TrackActionTypes.TRACK_READ_SUCCESS;

    constructor(public track: Track) {}
}


export class ReadTrackErrorAction implements Action {
    readonly type = TrackActionTypes.TRACK_READ_ERROR;

    constructor(public error: string) {}
}


export class ExportTrackKmlAction implements Action {
    readonly type = TrackActionTypes.TRACK_EXPORT_KML;

    constructor(public track: Track) {}
}


export class EditTrackAction implements Action {
    readonly type = TrackActionTypes.TRACK_EDIT;

    constructor(public track: Track) {}
}


export class DeleteTrackAction implements Action {
    readonly type = TrackActionTypes.TRACK_DELETE;

    constructor(public id: number) {}
}


export type TrackActions =
    ReadTrackListAction |
    ReadTrackListSuccessAction |
    ReadTrackListErrorAction |
    ReadTrackAction |
    ReadTrackSuccessAction |
    ReadTrackErrorAction |
    ExportTrackKmlAction |
    EditTrackAction |
    DeleteTrackAction;
