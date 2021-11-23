<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Position4d;


class RestPosition4dConverter {
    public static function toRest(Position4d $pos, ?int $roundPosToDigits = NULL, ?int $roundAltToDigits = NULL): array {
        return [
            RestPosition2dConverter::toRest($pos, $roundPosToDigits),
            RestAltitudeConverter::toRest($pos->altitude, $roundAltToDigits),
            RestTimestampConverter::toRest($pos->timestamp)
        ];
    }


    /**
     * @param Position4d[] $posList
     * @param int|null $roundPosToDigits
     * @param int|null $roundAltToDigits
     * @return array
     */
    public static function toRestList(array $posList, ?int $roundPosToDigits = NULL, ?int $roundAltToDigits = NULL): array {
        return array_map(
            function ($pos) use ($roundPosToDigits, $roundAltToDigits) { return self::toRest($pos, $roundPosToDigits, $roundAltToDigits); },
            $posList
        );
    }


    public static function fromRest(array $args): Position4d {
        $pos2d = RestPosition2dConverter::fromRest($args[0]);
        return new Position4d(
            $pos2d->longitude,
            $pos2d->latitude,
            RestAltitudeConverter::fromRest($args[1]),
            RestTimestampConverter::fromRest($args[2])
        );
    }


    /**
     * @param array $args
     * @return Position4d[]
     */
    public static function fromRestList(array $args): array {
        return array_map(
            function ($pos) { return self::fromRest($pos); },
            $args
        );
    }
}
