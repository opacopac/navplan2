<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Rest\Model;

use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\MeteoForecast\Domain\Model\VerticalCloudColumn;


class RestVerticalCloudColumnConverter {
    /**
     * @param VerticalCloudColumn[] $verticalCloudCols
     * @return array
     */
    public static function toRestList(array $verticalCloudCols): array {
        return array_map(
            function ($verticalCloudCol) { return self::toRest($verticalCloudCol); },
            $verticalCloudCols
        );
    }


    public static function toRest(?VerticalCloudColumn $verticlCloudCol): ?array {
        if (!$verticlCloudCol) {
            return null;
        }

        return [
            RestLengthConverter::toRest($verticlCloudCol->horDist),
            RestVerticalCloudLevelConverter::toRestList($verticlCloudCol->cloudLevels)
        ];
    }
}
