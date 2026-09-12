import {AltitudeMetadata} from "./altitude-metadata";
import {Length} from "../../../geo-physics/domain/model/quantities/length";


export class EnvelopeAltTriage {
    public static determineEnvelopeAltByPrio(
        alt: AltitudeMetadata,
        minTerrainAlt: Length,
        propagatedMinAlt: Length,
        propagatedMaxAlt: Length
    ) {
        // prio 3: propagate previous values
        if (propagatedMaxAlt.isLessThan(propagatedMinAlt)) {
            propagatedMinAlt = propagatedMaxAlt;
        }
        alt.minEnvelopeAlt = propagatedMinAlt;
        alt.maxEnvelopeAlt = propagatedMaxAlt;

        // prio 2: terrain clearance: override back-propagation if below terrain clearance
        if (minTerrainAlt.isGreaterThan(alt.minEnvelopeAlt)) {
            alt.minEnvelopeAlt = minTerrainAlt;
        }
        if (minTerrainAlt.isGreaterThan(alt.maxEnvelopeAlt)) {
            alt.maxEnvelopeAlt = minTerrainAlt;
        }

        // prio 1: used defined altitudes: override values if above previous min / below previous max
        if (alt.minUserAlt && alt.minUserAlt.isGreaterThan(alt.minEnvelopeAlt)) {
            alt.minEnvelopeAlt = alt.minUserAlt;
        }
        if (alt.maxUserAlt && alt.maxUserAlt.isLessThan(alt.maxEnvelopeAlt)) {
            alt.maxEnvelopeAlt = alt.maxUserAlt;
        }

        // prevent min > max
        if (alt.minUserAlt && alt.minUserAlt.isGreaterThan(alt.maxEnvelopeAlt)) {
            alt.maxEnvelopeAlt = alt.minUserAlt;
        }

        // prevent max < min
        if (alt.maxUserAlt && alt.maxUserAlt.isLessThan(alt.minEnvelopeAlt)) {
            alt.minEnvelopeAlt = alt.maxUserAlt;
        }
    }

}
