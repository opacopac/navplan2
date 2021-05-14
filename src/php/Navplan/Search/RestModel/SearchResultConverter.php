<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use Navplan\Airport\RestModel\RestAirportCircuitConverter;
use Navplan\Airport\RestModel\RestAirportConverter;
use Navplan\Airport\RestModel\RestReportingPointConverter;
use Navplan\Airspace\RestModel\RestAirspaceConverter;
use Navplan\Geoname\RestModel\RestGeonameConverter;
use Navplan\Navaid\RestModel\RestNavaidConverter;
use Navplan\Notam\DomainModel\Notam;
use Navplan\Notam\RestModel\NotamConverter;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\DomainModel\UserPoint;
use Navplan\User\RestModel\UserPointConverter;
use Navplan\Webcam\RestModel\RestWebcamConverter;


class SearchResultConverter {
    public static function toRest(SearchResult $result): array {
        return array(
            'airports' => RestAirportConverter::listToRest($result->airports),
            'navaids' => RestNavaidConverter::listToRest($result->navaids),
            'airspaces' => RestAirspaceConverter::listToRest($result->airspaces),
            'reportingpoints' => RestReportingPointConverter::listToRest($result->reportingPoints),
            'userpoints' => array_map(function (UserPoint $up) { return UserPointConverter::toRest($up); }, $result->userPoints),
            'webcams' => RestWebcamConverter::listToRest($result->webcams),
            'geonames' => RestGeonameConverter::listToRest($result->geonames),
            'notams' => array_map(function (Notam $notam) { return NotamConverter::toRest($notam); }, $result->notams),
            'circuits' => RestAirportCircuitConverter::listToRest($result->circuits)
        );
    }
}
