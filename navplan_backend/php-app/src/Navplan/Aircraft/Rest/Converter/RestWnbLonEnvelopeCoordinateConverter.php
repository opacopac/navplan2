<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\WnbLonEnvelopeCoordinate;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\Common\Rest\Converter\RestWeightConverter;


class RestWnbLonEnvelopeCoordinateConverter
{
    const KEY_WEIGHT = "weight";
    const KEY_ARM_CG = "armCg";

    public static function fromRest(array $args): WnbLonEnvelopeCoordinate
    {
        return new WnbLonEnvelopeCoordinate(
            RestWeightConverter::fromRest($args[self::KEY_WEIGHT]),
            RestLengthConverter::fromRest($args[self::KEY_ARM_CG])
        );
    }


    public static function toRest(WnbLonEnvelopeCoordinate $coordinate): array
    {
        return array(
            self::KEY_WEIGHT => RestWeightConverter::toRest($coordinate->weight),
            self::KEY_ARM_CG => RestLengthConverter::toRest($coordinate->armCg)
        );
    }


    /**
     * @param array $args
     * @return WnbLonEnvelopeCoordinate[]
     */
    public static function fromRestList(array $args): array
    {
        return array_map(
            function ($coordinate) {
                return self::fromRest($coordinate);
            },
            $args
        );
    }


    /**
     * @param WnbLonEnvelopeCoordinate[] $coordinateList
     * @return array
     */
    public static function toRestList(array $coordinateList): array
    {
        return array_map(
            function ($length) {
                return self::toRest($length);
            },
            $coordinateList
        );
    }
}
