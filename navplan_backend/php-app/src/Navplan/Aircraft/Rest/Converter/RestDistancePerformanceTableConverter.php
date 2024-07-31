<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\DistancePerformanceTable;
use Navplan\Aircraft\Domain\Model\PerformanceTableAltitudeReference;
use Navplan\Aircraft\Domain\Model\PerformanceTableTemperatureReference;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\Common\Rest\Converter\RestTemperatureConverter;
use Navplan\Common\Rest\Converter\RestWeightConverter;
use Navplan\Common\StringNumberHelper;


class RestDistancePerformanceTableConverter
{
    const KEY_TAKEOFF_WEIGHT = "takeoffWeight";
    const KEY_ALTITUDE_REFERENCE = "altitudeReference";
    const KEY_ALTITUDE_STEPS = "altitudeSteps";
    const KEY_TEMPERATURE_REFERENCE = "temperatureReference";
    const KEY_TEMPERATURE_STEPS = "temperatureSteps";
    const KEY_DISTANCE_VALUES = "distanceValues";
    const KEY_CORRECTION_FACTORS = "correctionFactors";


    public static function fromRest(?array $args): ?DistancePerformanceTable
    {
        if (!$args) {
            return NULL;
        }

        return new DistancePerformanceTable(
            RestWeightConverter::fromRest($args[self::KEY_TAKEOFF_WEIGHT]),
            PerformanceTableAltitudeReference::from(StringNumberHelper::parseStringOrError($args, self::KEY_ALTITUDE_REFERENCE)),
            RestLengthConverter::toRestList($args[self::KEY_ALTITUDE_STEPS]),
            PerformanceTableTemperatureReference::from(StringNumberHelper::parseStringOrError($args, self::KEY_TEMPERATURE_REFERENCE)),
            RestTemperatureConverter::fromRestList($args[self::KEY_TEMPERATURE_STEPS]),
            RestLengthConverter::toRestList($args[self::KEY_DISTANCE_VALUES]),
            RestDistancePerformanceCorrectionFactorsConverter::fromRest($args[self::KEY_CORRECTION_FACTORS])
        );
    }


    public static function toRest(?DistancePerformanceTable $table): ?array
    {
        if (!$table) {
            return NULL;
        }

        return array(
            self::KEY_TAKEOFF_WEIGHT => RestWeightConverter::toRest($table->takeoffWeight),
            self::KEY_ALTITUDE_REFERENCE => $table->altitudeReference?->value,
            self::KEY_ALTITUDE_STEPS => RestLengthConverter::toRestList($table->altitudeSteps),
            self::KEY_TEMPERATURE_REFERENCE => $table->temperatureReference?->value,
            self::KEY_TEMPERATURE_STEPS => RestTemperatureConverter::toRestList($table->temperatureSteps),
            self::KEY_DISTANCE_VALUES => array_map(
                function ($length) {
                    return RestLengthConverter::toRestList($length);
                },
                $table->distanceValues
            ),
            self::KEY_CORRECTION_FACTORS => RestDistancePerformanceCorrectionFactorsConverter::toRest($table->correctionFactors)
        );
    }
}
