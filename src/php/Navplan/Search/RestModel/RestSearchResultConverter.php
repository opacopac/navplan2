<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use Navplan\Aerodrome\Rest\Converter\RestAirportCircuitConverter;
use Navplan\Aerodrome\Rest\Converter\RestAirportConverter;
use Navplan\Aerodrome\Rest\Converter\RestReportingPointConverter;
use Navplan\Enroute\Rest\Converter\RestAirspaceConverter;
use Navplan\Enroute\Rest\Converter\RestNavaidConverter;
use Navplan\Geoname\Rest\Model\RestGeonameConverter;
use Navplan\Notam\RestModel\RestNotamConverter;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\User\RestModel\UserPointConverter;
use Navplan\Webcam\Rest\Model\RestWebcamConverter;


class RestSearchResultConverter {
    public static function toRest(SearchResult $result): array {
        return array(
            'airports' => RestAirportConverter::toRestList($result->airports),
            'navaids' => RestNavaidConverter::toRestList($result->navaids),
            'airspaces' => RestAirspaceConverter::toRestList($result->airspaces),
            'reportingpoints' => RestReportingPointConverter::toRestList($result->reportingPoints),
            'userpoints' => UserPointConverter::toRestList($result->userPoints),
            'webcams' => RestWebcamConverter::toRestList($result->webcams),
            'geonames' => RestGeonameConverter::toRestList($result->geonames),
            'notams' => RestNotamConverter::toRestList($result->notams),
            'circuits' => RestAirportCircuitConverter::toRestList($result->circuits)
        );
    }
}
