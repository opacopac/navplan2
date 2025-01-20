<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\WnbEnvelope;
use Navplan\Aircraft\Domain\Model\WnbEnvelopeAxisType;
use Navplan\Common\StringNumberHelper;


class RestWnbEnvelopeConverter
{
    const KEY_NAME = "name";
    const KEY_AXIS_TYPE = "axisType";
    const KEY_LAT_ENVELOPE = "latEnvelope";
    const KEY_LON_ENVELOPE = "lonEnvelope";

    public static function fromRest(array $args): WnbEnvelope
    {
        return new WnbEnvelope(
            StringNumberHelper::parseStringOrError($args, self::KEY_NAME),
            WnbEnvelopeAxisType::from(StringNumberHelper::parseStringOrError($args, self::KEY_AXIS_TYPE)),
            RestWnbLonEnvelopeCoordinateConverter::fromRestList($args[self::KEY_LON_ENVELOPE]),
            RestWnbLatEnvelopeCoordinateConverter::fromRestList($args[self::KEY_LAT_ENVELOPE])
        );
    }


    public static function toRest(WnbEnvelope $envelope): array
    {
        return array(
            self::KEY_NAME => $envelope->name,
            self::KEY_AXIS_TYPE => $envelope->axisType->value,
            self::KEY_LON_ENVELOPE => RestWnbLonEnvelopeCoordinateConverter::toRestList($envelope->lonCoordinates),
            self::KEY_LAT_ENVELOPE => RestWnbLatEnvelopeCoordinateConverter::toRestList($envelope->latCoordinates)
        );
    }


    public static function toRestList(array $envelopeList): array
    {
        return array_map(
            function ($envelope) {
                return self::toRest($envelope);
            },
            $envelopeList
        );
    }


    /**
     * @param array $args
     * @return WnbEnvelope[]
     */
    public static function fromRestList(array $args): array
    {
        return array_map(
            function ($envelope) {
                return self::fromRest($envelope);
            },
            $args
        );
    }
}
