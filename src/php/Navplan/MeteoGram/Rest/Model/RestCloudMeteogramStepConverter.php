<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Rest\Model;

use Navplan\Common\Rest\Converter\RestTemperatureConverter;
use Navplan\MeteoDwd\Rest\Model\RestVerticalCloudLevelConverter;
use Navplan\MeteoGram\Domain\Model\CloudMeteogramStep;


class RestCloudMeteogramStepConverter {
    const ARG_FC_STEP = "step";
    const ARG_CLOUD_LEVELS = "cloudLevels";
    const ARG_PRECIP = "precipMmPerHour";
    const ARG_TEMP = "temperature";


    /**
     * @param CloudMeteogramStep[] $cloudMeteogramSteps
     * @return array
     */
    public static function toRestList(array $cloudMeteogramSteps): array {
        return array_map(
            function ($verticalCloudCol) { return self::toRest($verticalCloudCol); },
            $cloudMeteogramSteps
        );
    }


    public static function toRest(?CloudMeteogramStep $cloudMeteogramStep): ?array {
        if (!$cloudMeteogramStep) {
            return null;
        }

        return [
            self::ARG_FC_STEP => $cloudMeteogramStep->forecastStep,
            self::ARG_CLOUD_LEVELS => RestVerticalCloudLevelConverter::toRestList($cloudMeteogramStep->cloudLevels),
            self::ARG_PRECIP => $cloudMeteogramStep->precipMmPerHour,
            self::ARG_TEMP => RestTemperatureConverter::toRest($cloudMeteogramStep->temperature)
        ];
    }
}
