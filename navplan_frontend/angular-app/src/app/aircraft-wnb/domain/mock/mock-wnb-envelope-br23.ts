import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WnbEnvelope} from '../model/wnb-envelope';
import {WnbEnvelopeAxisType} from '../model/wnb-envelope-axis-type';
import {WnbLonEnvelopeCoordinate} from '../model/wnb-lon-envelope-coordinate';


export class MockWnbEnvelopeBr23 {
    public static createAll(): WnbEnvelope[] {
        return [
            this.createDefault()
        ];
    }


    public static createDefault(): WnbEnvelope {
        return new WnbEnvelope(
            'W&B envelope in distance aft datum',
            WnbEnvelopeAxisType.WEIGHT_ARM,
            [
                new WnbLonEnvelopeCoordinate(Weight.ofKg(490), Length.ofM(1.712)),
                new WnbLonEnvelopeCoordinate(Weight.ofKg(600), Length.ofM(1.712)),
                new WnbLonEnvelopeCoordinate(Weight.ofKg(750), Length.ofM(1.792)),
                new WnbLonEnvelopeCoordinate(Weight.ofKg(750), Length.ofM(1.840)),
                new WnbLonEnvelopeCoordinate(Weight.ofKg(600), Length.ofM(1.840)),
                new WnbLonEnvelopeCoordinate(Weight.ofKg(490), Length.ofM(1.808)),
            ],
            []
        );
    }
}
