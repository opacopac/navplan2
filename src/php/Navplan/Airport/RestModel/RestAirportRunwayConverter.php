<?php declare(strict_types=1);

namespace Navplan\Airport\RestModel;

use Navplan\Airport\DomainModel\AirportRunway;
use Navplan\Common\RestModel\RestLengthConverter;


class RestAirportRunwayConverter {
    public static function toRest(AirportRunway $rwy): array {
        return array(
            "name" => $rwy->name,
            "surface" => $rwy->surface,
            "length" => $rwy->length ? RestLengthConverter::toRest($rwy->length) : NULL,
            "width" => $rwy->width ? RestLengthConverter::toRest($rwy->width) : NULL,
            "direction1" => $rwy->direction1,
            "direction2" => $rwy->direction2,
            "tora1" => $rwy->tora1 ? RestLengthConverter::toRest($rwy->tora1) : NULL,
            "tora2" => $rwy->tora2 ? RestLengthConverter::toRest($rwy->tora2) : NULL,
            "lda1" => $rwy->lda1 ? RestLengthConverter::toRest($rwy->lda1) : NULL,
            "lda2" => $rwy->lda2 ? RestLengthConverter::toRest($rwy->lda2) : NULL,
            "papi1" => $rwy->papi1,
            "papi2" => $rwy->papi2,
        );
    }
}
