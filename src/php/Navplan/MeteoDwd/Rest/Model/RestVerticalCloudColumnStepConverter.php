<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Rest\Model;

use Navplan\MeteoDwd\Domain\Model\VerticalCloudColumnStep;


class RestVerticalCloudColumnStepConverter {
    /**
     * @param VerticalCloudColumnStep[] $verticalCloudColSteps
     * @return array
     */
    public static function toRestList(array $verticalCloudColSteps): array {
        return array_map(
            function ($verticalCloudCol) { return self::toRest($verticalCloudCol); },
            $verticalCloudColSteps
        );
    }


    public static function toRest(?VerticalCloudColumnStep $verticlCloudColStep): ?array {
        if (!$verticlCloudColStep) {
            return null;
        }

        return [
            RestForecastStepConverter::toRest($verticlCloudColStep->forecastStep),
            RestVerticalCloudLevelConverter::toRestList($verticlCloudColStep->cloudLevels)
        ];
    }
}
