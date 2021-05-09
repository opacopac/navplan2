<?php declare(strict_types=1);

namespace Navplan\MeteoSma\RestModel;

use Navplan\Common\RestModel\RestAltitudeConverter;
use Navplan\Common\RestModel\RestPosition2dConverter;
use Navplan\MeteoSma\DomainModel\SmaStation;


class SmaStationConverter {
    public static function toRest(SmaStation $station): array {
        return array(
            "id" => $station->id,
            "name" => $station->name,
            "pos" => RestPosition2dConverter::toRest($station->position),
            "alt" => RestAltitudeConverter::toRest($station->altitude),
        );
    }
}
