<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\RestModel\RestAngleConverter;
use Navplan\Common\RestModel\RestSpeedConverter;
use Navplan\MeteoDwd\DomainModel\WindInfo;


class RestWindInfoConverter {
    /**
     * @param WindInfo[] $windInfos
     * @return array
     */
    public static function toRestList(array $windInfos): array {
        return array_map(
            function ($windSpeedDir) { return self::toRest($windSpeedDir); },
            $windInfos
        );
    }


    public static function toRest(?WindInfo $windInfo): ?array {
        if (!$windInfo) {
            return null;
        }

        return [
            RestSpeedConverter::toRest($windInfo->speed),
            RestAngleConverter::toRest($windInfo->dir),
            RestSpeedConverter::toRest($windInfo->gustSpeed)
        ];
    }
}
