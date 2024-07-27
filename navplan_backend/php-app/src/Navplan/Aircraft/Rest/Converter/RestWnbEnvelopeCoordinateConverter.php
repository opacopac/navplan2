<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\WnbEnvelopeCoordinate;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\Common\Rest\Converter\RestWeightConverter;


class RestWnbEnvelopeCoordinateConverter
{
    const KEY_WEIGHT = "weight";
    const KEY_ARM_CG = "armCg";

    public static function fromRest(array $args): WnbEnvelopeCoordinate
    {
        return new WnbEnvelopeCoordinate(
            RestWeightConverter::fromRest($args[self::KEY_WEIGHT]),
            RestLengthConverter::fromRest($args[self::KEY_ARM_CG])
        );
    }


    public static function toRest(WnbEnvelopeCoordinate $coordinate): array
    {
        return array(
            self::KEY_WEIGHT => RestWeightConverter::toRest($coordinate->weight),
            self::KEY_ARM_CG => RestLengthConverter::toRest($coordinate->armCg)
        );
    }


    /**
     * @param array $args
     * @return WnbEnvelopeCoordinate[]
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
     * @param WnbEnvelopeCoordinate[] $coordinateList
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
