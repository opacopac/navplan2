<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use Navplan\Airport\DomainModel\Airport;
use Navplan\Airport\DomainModel\AirportCircuit;
use Navplan\Airport\RestModel\RestAirportCircuitConverter;
use Navplan\Airport\RestModel\RestAirportConverter;
use Navplan\Notam\DomainModel\Notam;
use Navplan\Notam\RestModel\NotamConverter;
use Navplan\OpenAip\DomainModel\Airspace;
use Navplan\OpenAip\DomainModel\Navaid;
use Navplan\OpenAip\DomainModel\ReportingPoint;
use Navplan\OpenAip\DomainModel\Webcam;
use Navplan\OpenAip\RestModel\AirspaceConverter;
use Navplan\OpenAip\RestModel\NavaidConverter;
use Navplan\OpenAip\RestModel\ReportingPointConverter;
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
            'navaids' => array_map(function (Navaid $navaid) { return NavaidConverter::toRest($navaid); }, $result->navaids),
            'airspaces' => array_map(function (Airspace $as) { return AirspaceConverter::toRest($as); }, $result->airspaces),
            'reportingpoints' => array_map(function (ReportingPoint $rp) { return ReportingPointConverter::toRest($rp); }, $result->reportingPoints),
            'userpoints' => array_map(function (UserPoint $up) { return UserPointConverter::toRest($up); }, $result->userPoints),
            'webcams' => array_map(function (Webcam $cam) { return WebcamConverter::toRest($cam); }, $result->webcams),
            'geonames' => [],
            'notams' => array_map(function (Notam $notam) { return NotamConverter::toRest($notam); }, $result->notams),
            'circuits' => array_map(function (AirportCircuit $circuit) { return RestAirportCircuitConverter::toRest($circuit); }, $result->circuits )
        );
    }
}
