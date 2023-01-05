<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\MeteoDwd\DomainModel\VerticalCloudColumn;


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
            RestPosition2dConverter::toRest($verticlCloudCol->position),
            RestVerticalCloudLevelConverter::toRestList($verticlCloudCol->cloudLevels)
        ];
    }
}
