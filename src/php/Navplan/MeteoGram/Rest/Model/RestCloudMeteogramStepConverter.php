<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Rest\Model;

use Navplan\MeteoDwd\Rest\Model\RestVerticalCloudLevelConverter;
use Navplan\MeteoGram\Domain\Model\CloudMeteogramStep;


class RestCloudMeteogramStepConverter {
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
            $cloudMeteogramStep->forecastStep,
            RestVerticalCloudLevelConverter::toRestList($cloudMeteogramStep->cloudLevels)
        ];
    }
}
