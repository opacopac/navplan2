<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Common\Rest\Converter\RestConsumptionConverter;
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


    public static function fromRest(array $args): Aircraft
    {
        return new Aircraft(
            StringNumberHelper::parseIntOrNull($args, self::KEY_ID),
            StringNumberHelper::parseStringOrError($args, self::KEY_VEHICLE_TYPE),
            StringNumberHelper::parseStringOrError($args, self::KEY_REGISTRATION),
            StringNumberHelper::parseStringOrError($args, self::KEY_ICAO_TYPE),
            RestSpeedConverter::fromRest($args[self::KEY_CRUISE_SPEED]),
            RestConsumptionConverter::fromRest($args[self::KEY_CRUISE_FUEL]),
            StringNumberHelper::parseStringOrError($args, self::KEY_FUEL_TYPE),
            RestWeightConverter::fromRest($args[self::KEY_MTOW]),
            RestWeightConverter::fromRest($args[self::KEY_BEW])
        );
    }


    public static function toRest(Aircraft $aircraft): array
    {
        return array(
            self::KEY_ID => $aircraft->id,
            self::KEY_VEHICLE_TYPE => $aircraft->vehicleType,
            self::KEY_REGISTRATION => $aircraft->registration,
            self::KEY_ICAO_TYPE => $aircraft->icaoType,
            self::KEY_CRUISE_SPEED => RestSpeedConverter::toRest($aircraft->cruiseSpeed),
            self::KEY_CRUISE_FUEL => RestConsumptionConverter::toRest($aircraft->cruiseFuel),
            self::KEY_FUEL_TYPE => $aircraft->fuelType,
            self::KEY_MTOW => RestWeightConverter::toRest($aircraft->mtow),
            self::KEY_BEW => RestWeightConverter::toRest($aircraft->bew)
        );
    }


    public static function toRestShort(Aircraft $aircraft): array
    {
        return array(
            self::KEY_ID => $aircraft->id,
            self::KEY_VEHICLE_TYPE => $aircraft->vehicleType,
            self::KEY_REGISTRATION => $aircraft->registration,
            self::KEY_ICAO_TYPE => $aircraft->icaoType,
        );
    }
}
