<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\OpenAip\Domain\AirportRunway;


class AirportRunwayRest {
    public static function toArray(AirportRunway $rwy): array {
        return array(
            "name" => $rwy->name,
            "surface" => $rwy->surface,
            "length" => $rwy->length,
            "width" => $rwy->width,
            "direction1" => $rwy->direction1,
            "direction2" => $rwy->direction2,
            "tora1" => $rwy->tora1,
            "tora2" => $rwy->tora2,
            "lda1" => $rwy->lda1,
            "lda2" => $rwy->lda2,
            "papi1" => $rwy->papi1,
            "papi2" => $rwy->papi2,
        );
    }
}
