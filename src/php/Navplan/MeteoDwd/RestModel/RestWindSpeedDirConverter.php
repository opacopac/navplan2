<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\RestModel\RestAngleConverter;
use Navplan\Common\RestModel\RestSpeedConverter;
use Navplan\MeteoDwd\DomainModel\WindSpeedDir;


class RestWindSpeedDirConverter {
    /**
     * @param WindSpeedDir[] $windSpeedDirList
     * @return array
     */
    public static function toRestList(array $windSpeedDirList): array {
        return array_map(
            function ($windSpeedDir) { return self::toRest($windSpeedDir); },
            $windSpeedDirList
        );
    }


    public static function toRest(?WindSpeedDir $windSpeedDir): ?array {
        if (!$windSpeedDir) {
            return null;
        }

        return [
            RestSpeedConverter::toRest($windSpeedDir->speed),
            RestAngleConverter::toRest($windSpeedDir->dir)
        ];
    }
}
