<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\Airport\DomainModel\Airport;
use Navplan\Airport\DomainModel\ReportingPoint;
use Navplan\Airport\RestModel\RestAirportConverter;
use Navplan\Airport\RestModel\RestReportingPointConverter;
use Navplan\Navaid\DomainModel\Navaid;
use Navplan\OpenAip\DomainModel\SearchPointItemsResponse;
use Navplan\OpenAip\DomainModel\Webcam;


class SearchPointItemsResponseConverter {
    public static function toRest(SearchPointItemsResponse $response): array {
        return array(
            'airports' => array_map(function (Airport $airport) { return RestAirportConverter::toRest($airport); }, $response->airports),
            'navaids' => array_map(function (Navaid $navaid) { return NavaidConverter::toRest($navaid); }, $response->navaids),
            'reportingpoints' => array_map(function (ReportingPoint $rp) { return RestReportingPointConverter::toRest($rp); }, $response->reportingPoints),
            'webcams' => array_map(function (Webcam $cam) { return WebcamConverter::toRest($cam); }, $response->webcams),
        );
    }
}
