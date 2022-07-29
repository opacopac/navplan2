<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Converter;

use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Common\Rest\Converter\RestLengthConverter;


class RestAirportRunwayConverter {
    public static function toRest(AirportRunway $rwy): array {
        return array(
            "name" => $rwy->name,
            "surface" => $rwy->surface,
            "length" => $rwy->length ? RestLengthConverter::toRest($rwy->length) : NULL,
            "width" => $rwy->width ? RestLengthConverter::toRest($rwy->width) : NULL,
            "direction" => $rwy->direction,
            "tora" => $rwy->tora ? RestLengthConverter::toRest($rwy->tora) : NULL,
            "lda" => $rwy->lda ? RestLengthConverter::toRest($rwy->lda) : NULL,
            "papi" => $rwy->papi
        );
    }
}
