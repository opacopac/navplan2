<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\WnbEnvelope;
use Navplan\Common\StringNumberHelper;


class RestWnbEnvelopeConverter
{
    const KEY_NAME = "name";
    const KEY_COORDINATES = "coordinates";

    public static function fromRest(array $args): WnbEnvelope
    {
        return new WnbEnvelope(
            StringNumberHelper::parseStringOrError($args, self::KEY_NAME),
            RestWnbEnvelopeCoordinateConverter::fromRestList($args[self::KEY_COORDINATES])
        );
    }


    public static function toRest(WnbEnvelope $envelope): array
    {
        return array(
            self::KEY_NAME => $envelope->name,
            self::KEY_COORDINATES => RestWnbEnvelopeCoordinateConverter::toRestList($envelope->coordinates)
        );
    }
}
