<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Rest\Model;

use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\MeteoSma\Domain\Model\SmaStation;


class RestSmaStationConverter {
    public static function toRest(SmaStation $station): array {
        return array(
            "id" => $station->id,
            "name" => $station->name,
            "pos" => RestPosition2dConverter::toRest($station->position),
            "alt" => RestAltitudeConverter::toRest($station->altitude),
        );
    }
}
