<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use Navplan\Aerodrome\RestModel\RestAirportCircuitConverter;
use Navplan\Aerodrome\RestModel\RestAirportConverter;
use Navplan\Aerodrome\RestModel\RestReportingPointConverter;
use Navplan\Enroute\Rest\Converter\RestAirspaceConverter;
use Navplan\Enroute\Rest\Converter\RestNavaidConverter;
use Navplan\Geoname\RestModel\RestGeonameConverter;
use Navplan\Notam\RestModel\RestNotamConverter;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\RestModel\UserPointConverter;
use Navplan\Webcam\Rest\Model\RestWebcamConverter;


class RestSearchResultConverter {
    public static function toRest(SearchResult $result): array {
        return array(
            'airports' => RestAirportConverter::listToRest($result->airports),
            'navaids' => RestNavaidConverter::toRestList($result->navaids),
            'airspaces' => RestAirspaceConverter::toRestList($result->airspaces),
            'reportingpoints' => RestReportingPointConverter::listToRest($result->reportingPoints),
            'userpoints' => UserPointConverter::toRestList($result->userPoints),
            'webcams' => RestWebcamConverter::listToRest($result->webcams),
            'geonames' => RestGeonameConverter::toRestList($result->geonames),
            'notams' => RestNotamConverter::toRestList($result->notams),
            'circuits' => RestAirportCircuitConverter::listToRest($result->circuits)
        );
    }
}
