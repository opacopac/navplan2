<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest;

use Navplan\Geometry\Rest\RestAltitude;
use Navplan\Geometry\Rest\RestPosition2d;
use Navplan\MeteoSma\Domain\SmaStation;


class RestSmaStation {
    public static function toRest(SmaStation $station): array {
        return array(
            "id" => $station->id,
            "name" => $station->name,
            "pos" => RestPosition2d::toRest($station->position),
            "alt" => RestAltitude::toRest($station->altitude),
        );
    }
}
