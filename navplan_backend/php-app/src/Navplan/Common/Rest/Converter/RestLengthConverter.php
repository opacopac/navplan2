<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\LengthUnit;
use Navplan\Common\StringNumberHelper;


class RestLengthConverter
{
    public static function toRest(Length $length, ?int $roundToDigits = NULL): array
    {
        return [
            $roundToDigits === NULL ? $length->value : round($length->value, $roundToDigits),
            $length->unit->value,
        ];
    }


    public static function fromRest(array $args): Length
    {
        return new Length(
            StringNumberHelper::parseFloatOrError($args, 0),
            LengthUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }


    /**
     * @param array $args
     * @return Length[]
     */
    public static function fromRestList(array $args): array
    {
        return array_map(
            function ($length) {
                return self::fromRest($length);
            },
            $args
        );
    }


    /**
     * @param Length[] $lengthList
     * @return array
     */
    public static function toRestList(array $lengthList): array
    {
        return array_map(
            function ($length) {
                return self::toRest($length);
            },
            $lengthList
        );
    }


    /**
     * @param array $args
     * @return Length[][]
     */
    public static function fromRestArray(array $args): array {
        return array_map(
            function ($lengthList) {
                return self::fromRestList($lengthList);
            },
            $args
        );
    }


    /**
     * @param Length[][] $lengthArray
     * @return array
     */
    public static function toRestArray(array $lengthArray): array {
        return array_map(
            function ($lengthList) {
                return self::toRestList($lengthList);
            },
            $lengthArray
        );
    }
}
