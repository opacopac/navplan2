<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\Geometry\RestModel\LengthConverter;
use Navplan\OpenAip\DomainModel\AirportRunway;


class AirportRunwayConverter {
    public static function toRest(AirportRunway $rwy): array {
        return array(
            "name" => $rwy->name,
            "surface" => $rwy->surface,
            "length" => $rwy->length ? LengthConverter::toRest($rwy->length) : NULL,
            "width" => $rwy->width ? LengthConverter::toRest($rwy->width) : NULL,
            "direction1" => $rwy->direction1,
            "direction2" => $rwy->direction2,
            "tora1" => $rwy->tora1 ? LengthConverter::toRest($rwy->tora1) : NULL,
            "tora2" => $rwy->tora2 ? LengthConverter::toRest($rwy->tora2) : NULL,
            "lda1" => $rwy->lda1 ? LengthConverter::toRest($rwy->lda1) : NULL,
            "lda2" => $rwy->lda2 ? LengthConverter::toRest($rwy->lda2) : NULL,
            "papi1" => $rwy->papi1,
            "papi2" => $rwy->papi2,
        );
    }
}
