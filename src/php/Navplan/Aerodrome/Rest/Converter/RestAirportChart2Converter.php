<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Converter;

use Navplan\Aerodrome\Domain\Model\AirportChart2;
use Navplan\Common\RestModel\RestExtent2dConverter;


class RestAirportChart2Converter {
    public static function toRest(AirportChart2 $adChart): array {
        return array(
            "id" => $adChart->id,
            "ad_icao" => $adChart->airportIcao,
            "source" => $adChart->source,
            "type" => $adChart->type,
            "filename" => $adChart->filename,
            "extent" => RestExtent2dConverter::toRest($adChart->extent)
        );
    }


    public static function toRestList(array $adChartList): array {
        return array_map(
            function ($adChart) { return self::toRest($adChart); },
            $adChartList
        );
    }
}
