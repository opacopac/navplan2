<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\StringNumberHelper;


class RestPosition2dConverter {
    public static function toRest(Position2d $pos, ?int $roundToDigits = NULL): array {
        return [
            $roundToDigits === NULL ? $pos->longitude : round($pos->longitude, $roundToDigits),
            $roundToDigits === NULL ? $pos->latitude : round($pos->latitude, $roundToDigits)
        ];
    }


    public static function fromRest(array $args): Position2d {
        return new Position2d(
            StringNumberHelper::parseFloatOrError($args, 0),
            StringNumberHelper::parseFloatOrError($args, 1),
        );
    }


    /**
     * @param array $args
     * @return Position2d[]
     */
    public static function fromRestList(array $args): array {
        return array_map(
            function ($pos) { return self::fromRest($pos); },
            $args
        );
    }
}
