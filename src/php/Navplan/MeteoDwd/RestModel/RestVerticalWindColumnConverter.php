<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\MeteoDwd\DomainModel\VerticalWindColumn;


class RestVerticalWindColumnConverter {
    /**
     * @param VerticalWindColumn[] $verticalWindCols
     * @return array
     */
    public static function toRestList(array $verticalWindCols): array {
        return array_map(
            function ($verticalWindCol) { return self::toRest($verticalWindCol); },
            $verticalWindCols
        );
    }


    public static function toRest(?VerticalWindColumn $verticalWindCol): ?array {
        if (!$verticalWindCol) {
            return null;
        }

        return [
            RestLengthConverter::toRest($verticalWindCol->horDist),
            RestVerticalWindLevelConverter::toRestList($verticalWindCol->windLevels)
        ];
    }
}
