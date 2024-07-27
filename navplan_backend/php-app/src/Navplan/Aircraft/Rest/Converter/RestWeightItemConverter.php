<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\WeightItem;
use Navplan\Aircraft\Domain\Model\WeightItemType;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\Common\Rest\Converter\RestVolumeConverter;
use Navplan\Common\Rest\Converter\RestWeightConverter;
use Navplan\Common\StringNumberHelper;


class RestWeightItemConverter
{
    const KEY_TYPE = "type";
    const KEY_NAME = "name";
    const KEY_ARM = "arm";
    const KEY_MAX_WEIGHT = "maxWeight";
    const KEY_MAX_FUEL = "maxFuel";


    public static function fromRest(array $args): WeightItem
    {
        return new WeightItem(
            WeightItemType::from(StringNumberHelper::parseStringOrError($args, self::KEY_TYPE)),
            StringNumberHelper::parseStringOrError($args, self::KEY_NAME),
            RestLengthConverter::fromRest($args[self::KEY_ARM]),
            RestWeightConverter::fromRest($args[self::KEY_MAX_WEIGHT]),
            RestVolumeConverter::fromRest($args[self::KEY_MAX_FUEL])
        );
    }


    public static function toRest(WeightItem $weightItem): array
    {
        return array(
            self::KEY_TYPE => $weightItem->type->value,
            self::KEY_NAME => $weightItem->name,
            self::KEY_ARM => RestLengthConverter::toRest($weightItem->arm),
            self::KEY_MAX_WEIGHT => RestWeightConverter::toRest($weightItem->maxWeight),
            self::KEY_MAX_FUEL => RestVolumeConverter::toRest($weightItem->maxFuel)
        );
    }


    public static function toRestList(array $envelopeList): array {
        return array_map(
            function ($envelope) { return self::toRest($envelope); },
            $envelopeList
        );
    }


    /**
     * @param array $args
     * @return WeightItem[]
     */
    public static function fromRestList(array $args): array {
        return array_map(
            function ($weightItem) { return self::fromRest($weightItem); },
            $args
        );
    }
}
