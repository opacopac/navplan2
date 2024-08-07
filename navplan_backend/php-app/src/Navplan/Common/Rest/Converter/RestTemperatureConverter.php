<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Temperature;
use Navplan\Common\Domain\Model\TemperatureUnit;
use Navplan\Common\StringNumberHelper;


class RestTemperatureConverter
{
    public static function toRest(?Temperature $temp): ?array
    {
        if (!$temp) {
            return NULL;
        }

        return [
            $temp->value,
            $temp->unit->value
        ];
    }


    public static function fromRest(?array $args): ?Temperature
    {
        if (!$args) {
            return NULL;
        }

        return new Temperature(
            StringNumberHelper::parseFloatOrError($args, 0),
            TemperatureUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }


    /**
     * @param array $args
     * @return Temperature[]
     */
    public static function fromRestList(array $args): array
    {
        return array_map(
            function ($temp) {
                return self::fromRest($temp);
            },
            $args
        );
    }


    /**
     * @param Temperature[] $tempList
     * @return array
     */
    public static function toRestList(array $tempList): array
    {
        return array_map(
            function ($temp) {
                return self::toRest($temp);
            },
            $tempList
        );
    }
}
