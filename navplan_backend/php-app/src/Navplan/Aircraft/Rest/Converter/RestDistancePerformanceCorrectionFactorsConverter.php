<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\DistancePerformanceCorrectionFactors;
use Navplan\Common\Rest\Converter\RestSpeedConverter;
use Navplan\Common\StringNumberHelper;


class RestDistancePerformanceCorrectionFactorsConverter
{
    const KEY_GRASS_RWY_INC_PERCENT = "grassRwyIncPercent";
    const KEY_WET_RWY_INC_PERCENT = "wetRwyIncPercent";
    const KEY_HEADWIND_DEC_PERCENT = "headwindDecPercent";
    const KEY_HEADWIND_DEC_PER_SPEED = "headwindDecPerSpeed";
    const KEY_TAILWIND_INC_PERCENT = "tailwindIncPercent";
    const KEY_TAILWIND_INC_PER_SPEED = "tailwindIncPerSpeed";


    public static function fromRest(array $args): DistancePerformanceCorrectionFactors
    {
        return new DistancePerformanceCorrectionFactors(
            StringNumberHelper::parseFloatOrZero($args, self::KEY_GRASS_RWY_INC_PERCENT),
            StringNumberHelper::parseFloatOrZero($args, self::KEY_WET_RWY_INC_PERCENT),
            StringNumberHelper::parseFloatOrZero($args, self::KEY_HEADWIND_DEC_PERCENT),
            RestSpeedConverter::fromRest($args[self::KEY_HEADWIND_DEC_PER_SPEED]),
            StringNumberHelper::parseFloatOrZero($args, self::KEY_TAILWIND_INC_PERCENT),
            RestSpeedConverter::fromRest($args[self::KEY_TAILWIND_INC_PER_SPEED])
        );
    }


    public static function toRest(DistancePerformanceCorrectionFactors $correctionFactors): array
    {
        return array(
            self::KEY_GRASS_RWY_INC_PERCENT => $correctionFactors->grassRwyIncPercent,
            self::KEY_WET_RWY_INC_PERCENT => $correctionFactors->wetRwyIncPercent,
            self::KEY_HEADWIND_DEC_PERCENT => $correctionFactors->headwindDecPercent,
            self::KEY_HEADWIND_DEC_PER_SPEED => RestSpeedConverter::toRest($correctionFactors->headwindDecPerSpeed),
            self::KEY_TAILWIND_INC_PERCENT => $correctionFactors->tailwindIncPercent,
            self::KEY_TAILWIND_INC_PER_SPEED => RestSpeedConverter::toRest($correctionFactors->tailwindIncPerSpeed)
        );
    }
}
