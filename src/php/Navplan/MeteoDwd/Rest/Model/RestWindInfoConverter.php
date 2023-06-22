<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Rest\Model;

use Navplan\Common\Rest\Converter\RestAngleConverter;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\Common\Rest\Converter\RestSpeedConverter;
use Navplan\MeteoDwd\Domain\Model\WindInfo;


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
            RestSpeedConverter::toRest($windInfo->gustSpeed),
            RestPosition2dConverter::toRest($windInfo->pos)
        ];
    }
}
