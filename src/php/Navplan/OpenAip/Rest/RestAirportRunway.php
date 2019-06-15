<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\Geometry\Rest\RestLength;
use Navplan\OpenAip\Domain\AirportRunway;


class RestAirportRunway {
    public static function toRest(AirportRunway $rwy): array {
        return array(
            "name" => $rwy->name,
            "surface" => $rwy->surface,
            "length" => $rwy->length ? RestLength::toRest($rwy->length) : NULL,
            "width" => $rwy->width ? RestLength::toRest($rwy->width) : NULL,
            "direction1" => $rwy->direction1,
            "direction2" => $rwy->direction2,
            "tora1" => $rwy->tora1 ? RestLength::toRest($rwy->tora1) : NULL,
            "tora2" => $rwy->tora2 ? RestLength::toRest($rwy->tora2) : NULL,
            "lda1" => $rwy->lda1 ? RestLength::toRest($rwy->lda1) : NULL,
            "lda2" => $rwy->lda2 ? RestLength::toRest($rwy->lda2) : NULL,
            "papi1" => $rwy->papi1,
            "papi2" => $rwy->papi2,
        );
    }
}
