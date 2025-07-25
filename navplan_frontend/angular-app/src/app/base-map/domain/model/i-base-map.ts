import {Observable} from 'rxjs';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {DataItem} from '../../../common/domain/model/data-item';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ShowImageState} from '../../state/state-model/show-image-state';
import {MapBaseLayerType} from './map-base-layer-type';
import {CursorMode} from '../../state/state-model/cursor-mode';

export interface IBaseMap {
    get mapClick$(): Observable<[Position2d, DataItem]>;

    get mapMove$(): Observable<void>;

    uninit(): void;

    getZoom(): number;

    setZoom(zoom: number): void;

    setPosition(position: Position2d): void;

    getMapPosition(): Position2d;

    getRotation(): Angle;

    getExtent(): Extent2d;

    showImage(showImageState: ShowImageState): void;

    closeImage(imageId: number): void;

    clearImages(): void;

    changeBaseLayer(baseLayerType: MapBaseLayerType): void;

    setCursorMode(cursorMode: CursorMode): void;
}
