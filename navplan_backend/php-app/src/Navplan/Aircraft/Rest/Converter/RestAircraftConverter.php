<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Domain\Model\FuelType;
use Navplan\Aircraft\Domain\Model\VehicleType;
use Navplan\Common\Rest\Converter\RestConsumptionConverter;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\Common\Rest\Converter\RestSpeedConverter;
use Navplan\Common\Rest\Converter\RestWeightConverter;
use Navplan\Common\StringNumberHelper;


class RestAircraftConverter
{
    const KEY_ID = "id";
    const KEY_VEHICLE_TYPE = "vehicleType";
    const KEY_REGISTRATION = "registration";
    const KEY_ICAO_TYPE = "icaoType";
    const KEY_CRUISE_SPEED = "cruiseSpeed";
    const KEY_CRUISE_FUEL = "cruiseFuel";
    const KEY_FUEL_TYPE = "fuelType";
    const KEY_MTOW = "mtow";
    const KEY_BEW = "bew";
    const KEY_ROC_SEALEVEL = "rocSealevel";
    const KEY_SERVICE_CEILING = "serviceCeiling";
    const KEY_CRUISE_CLIMB_SPEED = "cruiseClimbSpeed";
    const KEY_PERF_TAKEOFF_GROUND_ROLL = "perfTakeoffGroundRoll";
    const KEY_PERF_TAKEOFF_DIST_50FT = "perfTakeoffDist50ft";
    const KEY_PERF_LANDING_GROUND_ROLL = "perfLandingGroundRoll";
    const KEY_PERF_LANDING_DIST_50FT = "perfLandingDist50ft";
    const KEY_WNB_WEIGHT_ITEMS = "wnbWeightItems";
    const KEY_WNB_ENVELOPES = "wnbEnvelopes";


    public static function fromRest(array $args): Aircraft
    {
        return new Aircraft(
            StringNumberHelper::parseIntOrNull($args, self::KEY_ID),
            VehicleType::from(StringNumberHelper::parseStringOrError($args, self::KEY_VEHICLE_TYPE)),
            StringNumberHelper::parseStringOrError($args, self::KEY_REGISTRATION),
            StringNumberHelper::parseStringOrError($args, self::KEY_ICAO_TYPE),
            RestSpeedConverter::fromRest($args[self::KEY_CRUISE_SPEED]),
            RestConsumptionConverter::fromRest($args[self::KEY_CRUISE_FUEL]),
            isset($args[self::KEY_FUEL_TYPE]) ? FuelType::from($args[self::KEY_FUEL_TYPE]) : NULL,
            RestWeightConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_MTOW)),
            RestWeightConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_BEW)),
            RestSpeedConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_ROC_SEALEVEL)),
            RestLengthConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_SERVICE_CEILING)),
            RestSpeedConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_CRUISE_CLIMB_SPEED)),
            RestDistancePerformanceTableConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_PERF_TAKEOFF_GROUND_ROLL)),
            RestDistancePerformanceTableConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_PERF_TAKEOFF_DIST_50FT)),
            RestDistancePerformanceTableConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_PERF_LANDING_GROUND_ROLL)),
            RestDistancePerformanceTableConverter::fromRest(StringNumberHelper::parseArrayOrNull($args, self::KEY_PERF_LANDING_DIST_50FT)),
            RestWeightItemConverter::fromRestList($args[self::KEY_WNB_WEIGHT_ITEMS]),
            RestWnbEnvelopeConverter::fromRestList($args[self::KEY_WNB_ENVELOPES])
        );
    }


    public static function toRest(Aircraft $aircraft): array
    {
        return array(
            self::KEY_ID => $aircraft->id,
            self::KEY_VEHICLE_TYPE => $aircraft->vehicleType->value,
            self::KEY_REGISTRATION => $aircraft->registration,
            self::KEY_ICAO_TYPE => $aircraft->icaoType,
            self::KEY_CRUISE_SPEED => RestSpeedConverter::toRest($aircraft->cruiseSpeed),
            self::KEY_CRUISE_FUEL => RestConsumptionConverter::toRest($aircraft->cruiseFuel),
            self::KEY_FUEL_TYPE => $aircraft->fuelType?->value,
            self::KEY_MTOW => RestWeightConverter::toRest($aircraft->mtow),
            self::KEY_BEW => RestWeightConverter::toRest($aircraft->bew),
            self::KEY_ROC_SEALEVEL => RestSpeedConverter::toRest($aircraft->rocSealevel),
            self::KEY_SERVICE_CEILING => RestLengthConverter::toRest($aircraft->serviceCeiling),
            self::KEY_CRUISE_CLIMB_SPEED => RestSpeedConverter::toRest($aircraft->cruiseClimbSpeed),
            self::KEY_PERF_TAKEOFF_GROUND_ROLL => RestDistancePerformanceTableConverter::toRest($aircraft->perfTakeoffGroundRoll),
            self::KEY_PERF_TAKEOFF_DIST_50FT => RestDistancePerformanceTableConverter::toRest($aircraft->perfTakeoffDist50ft),
            self::KEY_PERF_LANDING_GROUND_ROLL => RestDistancePerformanceTableConverter::toRest($aircraft->perfLandingGroundRoll),
            self::KEY_PERF_LANDING_DIST_50FT => RestDistancePerformanceTableConverter::toRest($aircraft->perfLandingDist50ft),
            self::KEY_WNB_WEIGHT_ITEMS => RestWeightItemConverter::toRestList($aircraft->wnbWeightItems),
            self::KEY_WNB_ENVELOPES => RestWnbEnvelopeConverter::toRestList($aircraft->wnbLonEnvelopes)
        );
    }


    public static function toRestShort(Aircraft $aircraft): array
    {
        return array(
            self::KEY_ID => $aircraft->id,
            self::KEY_VEHICLE_TYPE => $aircraft->vehicleType->value,
            self::KEY_REGISTRATION => $aircraft->registration,
            self::KEY_ICAO_TYPE => $aircraft->icaoType,
        );
    }
}
