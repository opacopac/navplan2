<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\WnbLatEnvelopeCoordinate;
use Navplan\Common\Rest\Converter\RestLengthConverter;


class RestWnbLatEnvelopeCoordinateConverter
{
    const KEY_LAT_ARM_CG = "latArmCg";
    const KEY_LON_ARM_CG = "lonArmCg";

    public static function fromRest(array $args): WnbLatEnvelopeCoordinate
    {
        return new WnbLatEnvelopeCoordinate(
            RestLengthConverter::fromRest($args[self::KEY_LAT_ARM_CG]),
            RestLengthConverter::fromRest($args[self::KEY_LON_ARM_CG])
        );
    }


    public static function toRest(WnbLatEnvelopeCoordinate $coordinate): array
    {
        return array(
            self::KEY_LAT_ARM_CG => RestLengthConverter::toRest($coordinate->latArmCg),
            self::KEY_LON_ARM_CG => RestLengthConverter::toRest($coordinate->lonArmCg)
        );
    }


    /**
     * @param array $args
     * @return WnbLatEnvelopeCoordinate[]
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
     * @param WnbLatEnvelopeCoordinate[] $coordinateList
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
