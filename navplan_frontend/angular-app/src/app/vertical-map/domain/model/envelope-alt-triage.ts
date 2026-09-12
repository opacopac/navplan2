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
        alt.perfEnv.minAlt = propagatedMinAlt;
        alt.perfEnv.maxAlt = propagatedMaxAlt;

        // prio 2: terrain clearance: override back-propagation if below terrain clearance
        if (minTerrainAlt.isGreaterThan(alt.perfEnv.minAlt)) {
            alt.perfEnv.minAlt = minTerrainAlt;
        }
        if (minTerrainAlt.isGreaterThan(alt.perfEnv.maxAlt)) {
            alt.perfEnv.maxAlt = minTerrainAlt;
        }

        // prio 1: used defined altitudes: override values if above previous min / below previous max
        if (alt.user.minAlt && alt.user.minAlt.isGreaterThan(alt.perfEnv.minAlt)) {
            alt.perfEnv.minAlt = alt.user.minAlt;
        }
        if (alt.user.maxAlt && alt.user.maxAlt.isLessThan(alt.perfEnv.maxAlt)) {
            alt.perfEnv.maxAlt = alt.user.maxAlt;
        }

        // prevent min > max
        if (alt.user.minAlt && alt.user.minAlt.isGreaterThan(alt.perfEnv.maxAlt)) {
            alt.perfEnv.maxAlt = alt.user.minAlt;
        }

        // prevent max < min
        if (alt.user.maxAlt && alt.user.maxAlt.isLessThan(alt.perfEnv.minAlt)) {
            alt.perfEnv.minAlt = alt.user.maxAlt;
        }
    }

}
