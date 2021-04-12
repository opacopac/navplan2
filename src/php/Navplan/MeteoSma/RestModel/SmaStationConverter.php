<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestModel;

use Navplan\Geometry\RestModel\AltitudeConverter;
use Navplan\Geometry\RestModel\Position2dConverter;
use Navplan\MeteoSma\DomainModel\SmaStation;


class SmaStationConverter {
    public static function toRest(SmaStation $station): array {
        return array(
            "id" => $station->id,
            "name" => $station->name,
            "pos" => Position2dConverter::toRest($station->position),
            "alt" => AltitudeConverter::toRest($station->altitude),
        );
    }
}
