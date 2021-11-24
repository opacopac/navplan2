import {IRestVolume} from './i-rest-volume';
import {Volume} from '../domain-model/quantities/volume';
import {VolumeUnit} from '../domain-model/quantities/volume-unit';


export class RestVolumeConverter {
    public static fromRest(restVolume: IRestVolume): Volume {
        return restVolume ? new Volume(
            restVolume[0],
            VolumeUnit[restVolume[1]],
        ) : undefined;
    }


    public static toRest(volume: Volume): IRestVolume {
        return volume ? [
            volume.value,
            VolumeUnit[volume.unit]
        ] : undefined;
    }
}
