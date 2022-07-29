<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Converter;

use Navplan\Aerodrome\Domain\Model\AirportChart;


class RestAirportChartConverter {
    public static function toRest(AirportChart $adChart): array {
        return array(
            "id" => $adChart->id,
            "airport_icao" => $adChart->airportIcao,
            "source" => $adChart->source,
            "type" => $adChart->type,
            "filename" => $adChart->filename,
            "mercator_n" => $adChart->mercator_n,
            "mercator_s" => $adChart->mercator_s,
            "mercator_e" => $adChart->mercator_e,
            "mercator_w" => $adChart->mercator_w
        );
    }


    public static function toRestList(array $adChartList): array {
        return array_map(
            function ($adChart) { return self::toRest($adChart); },
            $adChartList
        );
    }
}
