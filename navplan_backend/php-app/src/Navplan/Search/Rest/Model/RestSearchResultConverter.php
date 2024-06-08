<?php declare(strict_types=1);

namespace Navplan\Search\Rest\Model;

use Navplan\Aerodrome\Rest\Converter\RestAirportCircuitConverter;
use Navplan\Aerodrome\Rest\Converter\RestAirportConverter;
use Navplan\Aerodrome\Rest\Converter\RestReportingPointConverter;
use Navplan\Airspace\Rest\Converter\RestAirspaceConverter;
use Navplan\Enroute\Rest\Converter\RestNavaidConverter;
use Navplan\Geoname\Rest\Model\RestGeonameConverter;
use Navplan\Notam\Rest\Model\RestNotamConverter;
use Navplan\Search\Domain\Model\SearchResult;
use Navplan\User\Rest\Model\UserPointConverter;
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
