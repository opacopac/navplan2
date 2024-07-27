<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Weight;
use Navplan\Common\Domain\Model\WeightUnit;
use Navplan\Common\StringNumberHelper;


class RestWeightConverter
{
    public static function toRest(?Weight $weight): ?array
    {
        if (!$weight) {
            return NULL;
        }

        return [
            $weight->value,
            $weight->unit->value
        ];
    }


    public static function fromRest(?array $args): ?Weight
    {
        if (!$args) {
            return NULL;
        }

        return new Weight(
            StringNumberHelper::parseFloatOrError($args, 0),
            WeightUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }


    public static function toRestList(array $weightList): array {
        return array_map(
            function ($weight) { return self::toRest($weight); },
            $weightList
        );
    }


    /**
     * @param array $args
     * @return Weight[]
     */
    public static function fromRestList(array $args): array {
        return array_map(
            function ($weight) { return self::fromRest($weight); },
            $args
        );
    }
}
