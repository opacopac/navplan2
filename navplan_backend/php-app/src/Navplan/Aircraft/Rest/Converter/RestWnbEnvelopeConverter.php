<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\WnbEnvelope;
use Navplan\Aircraft\Domain\Model\WnbEnvelopeArmDirection;
use Navplan\Aircraft\Domain\Model\WnbEnvelopeAxisType;
use Navplan\Common\StringNumberHelper;


class RestWnbEnvelopeConverter
{
    const KEY_NAME = "name";
    const KEY_AXIS_TYPE = "axisType";
    const KEY_ARM_DIRECTION = "armDirection";
    const KEY_COORDINATES = "coordinates";

    public static function fromRest(array $args): WnbEnvelope
    {
        return new WnbEnvelope(
            StringNumberHelper::parseStringOrError($args, self::KEY_NAME),
            WnbEnvelopeAxisType::from(StringNumberHelper::parseStringOrError($args, self::KEY_AXIS_TYPE)),
            WnbEnvelopeArmDirection::from(StringNumberHelper::parseStringOrError($args, self::KEY_ARM_DIRECTION)),
            RestWnbEnvelopeCoordinateConverter::fromRestList($args[self::KEY_COORDINATES])
        );
    }


    public static function toRest(WnbEnvelope $envelope): array
    {
        return array(
            self::KEY_NAME => $envelope->name,
            self::KEY_AXIS_TYPE => $envelope->axisType->value,
            self::KEY_ARM_DIRECTION => $envelope->armDirection->value,
            self::KEY_COORDINATES => RestWnbEnvelopeCoordinateConverter::toRestList($envelope->coordinates)
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
