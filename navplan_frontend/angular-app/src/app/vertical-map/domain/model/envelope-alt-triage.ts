import {AltitudeMetadata} from "./altitude-metadata";
import {Length} from "../../../geo-physics/domain/model/quantities/length";


export class EnvelopeAltTriage {
    public static determineEnvelopeAltByPrio(
        alt: AltitudeMetadata,
        minTerrainAlt: Length,
        propagatedMinAlt: Length,
        propagatedMaxAlt: Length
    ) {
        EnvelopeAltTriage.determineEnvelopeAltByPrioForProperty(
            alt,
            'perfEnv',
            minTerrainAlt,
            propagatedMinAlt,
            propagatedMaxAlt
        );
    }


    public static determineSteepEnvelopeAltByPrio(
        alt: AltitudeMetadata,
        minTerrainAlt: Length,
        propagatedMinAlt: Length,
        propagatedMaxAlt: Length
    ) {
        EnvelopeAltTriage.determineEnvelopeAltByPrioForProperty(
            alt,
            'perfEnvSteep',
            minTerrainAlt,
            propagatedMinAlt,
            propagatedMaxAlt
        );
    }


    private static determineEnvelopeAltByPrioForProperty(
        alt: AltitudeMetadata,
        property: 'perfEnv' | 'perfEnvSteep',
        minTerrainAlt: Length,
        propagatedMinAlt: Length,
        propagatedMaxAlt: Length
    ) {
        const perfEnv = alt[property];

        // prio 3: propagate previous values
        if (propagatedMaxAlt.isLessThan(propagatedMinAlt)) {
            propagatedMinAlt = propagatedMaxAlt;
        }
        perfEnv.minAlt = propagatedMinAlt;
        perfEnv.maxAlt = propagatedMaxAlt;

        // prio 2: terrain clearance: override back-propagation if below terrain clearance
        if (minTerrainAlt.isGreaterThan(perfEnv.minAlt)) {
            perfEnv.minAlt = minTerrainAlt;
        }
        if (minTerrainAlt.isGreaterThan(perfEnv.maxAlt)) {
            perfEnv.maxAlt = minTerrainAlt;
        }

        // prio 1: used defined altitudes: override values if above previous min / below previous max
        if (alt.user.minAlt && alt.user.minAlt.isGreaterThan(perfEnv.minAlt)) {
            perfEnv.minAlt = alt.user.minAlt;
        }
        if (alt.user.maxAlt && alt.user.maxAlt.isLessThan(perfEnv.maxAlt)) {
            perfEnv.maxAlt = alt.user.maxAlt;
        }

        // prevent min > max
        if (alt.user.minAlt && alt.user.minAlt.isGreaterThan(perfEnv.maxAlt)) {
            perfEnv.maxAlt = alt.user.minAlt;
        }

        // prevent max < min
        if (alt.user.maxAlt && alt.user.maxAlt.isLessThan(perfEnv.minAlt)) {
            perfEnv.minAlt = alt.user.maxAlt;
        }
    }

}
