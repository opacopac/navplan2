import {AltitudeMetadata} from "./altitude-metadata";
import {AltitudeSpan} from "./altitude-span";
import {Length} from "../../../geo-physics/domain/model/quantities/length";


export class EnvelopeAltTriage {
    public static determineEnvelopeAltByPrio(
        alt: AltitudeMetadata,
        minTerrainAlt: Length,
        propagatedMinAlt: Length,
        propagatedMaxAlt: Length,
        propagatedMinAltSteep: Length,
        propagatedMaxAltSteep: Length
    ) {
        EnvelopeAltTriage.determineEnvelopeAltByPrioForSpan(
            alt.perfEnv,
            alt.user,
            minTerrainAlt,
            propagatedMinAlt,
            propagatedMaxAlt
        );
        EnvelopeAltTriage.determineEnvelopeAltByPrioForSpan(
            alt.perfEnvSteep,
            alt.user,
            minTerrainAlt,
            propagatedMinAltSteep,
            propagatedMaxAltSteep
        );
    }


    private static determineEnvelopeAltByPrioForSpan(
        perfEnv: AltitudeSpan,
        user: AltitudeSpan,
        minTerrainAlt: Length,
        propagatedMinAlt: Length,
        propagatedMaxAlt: Length
    ) {
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
        if (user.minAlt && user.minAlt.isGreaterThan(perfEnv.minAlt)) {
            perfEnv.minAlt = user.minAlt;
        }
        if (user.maxAlt && user.maxAlt.isLessThan(perfEnv.maxAlt)) {
            perfEnv.maxAlt = user.maxAlt;
        }

        // prevent min > max
        if (user.minAlt && user.minAlt.isGreaterThan(perfEnv.maxAlt)) {
            perfEnv.maxAlt = user.minAlt;
        }

        // prevent max < min
        if (user.maxAlt && user.maxAlt.isLessThan(perfEnv.minAlt)) {
            perfEnv.minAlt = user.maxAlt;
        }
    }

}
