import {IRestVerticalMapAirspace} from './i-rest-vertical-map-airspace';
import {VerticalMapAirspace} from '../domain-model/vertical-map-airspace';
import {RestAltitudeConverter} from '../../common/geo-math/rest-model/rest-altitude-converter';
import {RestVerticalMapAirspaceStepConverter} from './rest-vertical-map-airspace-step-converter';
import {LengthUnit} from '../../common/geo-math/domain-model/quantities/length-unit';


export class RestVerticalMapAirspaceConverter {
    public static fromRestList(
        vmAirspaces: IRestVerticalMapAirspace[],
        heightUnit: LengthUnit,
        widthUnit: LengthUnit
    ): VerticalMapAirspace[] {
        return vmAirspaces.map(vmAirspace => this.fromRest(vmAirspace, heightUnit, widthUnit));
    }


    public static fromRest(
        vmAirspace: IRestVerticalMapAirspace,
        heightUnit: LengthUnit,
        widthUnit: LengthUnit
    ): VerticalMapAirspace {
        return new VerticalMapAirspace(
            vmAirspace.airspaceId,
            vmAirspace.airspaceCategory,
            vmAirspace.airspaceName,
            RestAltitudeConverter.fromRest(vmAirspace.altBottom),
            RestAltitudeConverter.fromRest(vmAirspace.altTop),
            RestVerticalMapAirspaceStepConverter.fromRestList(vmAirspace.airspaceSteps, heightUnit, widthUnit)
        );
    }
}
