<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use Navplan\Airport\DomainModel\Airport;
use Navplan\Airport\DomainModel\AirportCircuit;
use Navplan\Airport\DomainModel\ReportingPoint;
use Navplan\Airport\RestModel\RestAirportCircuitConverter;
use Navplan\Airport\RestModel\RestAirportConverter;
use Navplan\Airport\RestModel\RestReportingPointConverter;
use Navplan\Airspace\DomainModel\Airspace;
use Navplan\Airspace\RestModel\RestAirspaceConverter;
use Navplan\Navaid\DomainModel\Navaid;
use Navplan\Navaid\RestModel\RestNavaidConverter;
use Navplan\Notam\DomainModel\Notam;
use Navplan\Notam\RestModel\NotamConverter;
use Navplan\OpenAip\DomainModel\Webcam;
use Navplan\OpenAip\RestModel\WebcamConverter;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\DomainModel\UserPoint;
use Navplan\User\RestModel\UserPointConverter;


class SearchResultConverter {
    public static function toRest(
        SearchResult $result
    ): array {
        return array(
            'airports' => array_map(function (Airport $airport) { return RestAirportConverter::toRest($airport); }, $result->airports),
            'navaids' => array_map(function (Navaid $navaid) { return RestNavaidConverter::toRest($navaid); }, $result->navaids),
            'airspaces' => array_map(function (Airspace $as) { return RestAirspaceConverter::toRest($as); }, $result->airspaces),
            'reportingpoints' => array_map(function (ReportingPoint $rp) { return RestReportingPointConverter::toRest($rp); }, $result->reportingPoints),
            'userpoints' => array_map(function (UserPoint $up) { return UserPointConverter::toRest($up); }, $result->userPoints),
            'webcams' => array_map(function (Webcam $cam) { return WebcamConverter::toRest($cam); }, $result->webcams),
            'geonames' => [],
            'notams' => array_map(function (Notam $notam) { return NotamConverter::toRest($notam); }, $result->notams),
            'circuits' => array_map(function (AirportCircuit $circuit) { return RestAirportCircuitConverter::toRest($circuit); }, $result->circuits )
        );
    }
}
